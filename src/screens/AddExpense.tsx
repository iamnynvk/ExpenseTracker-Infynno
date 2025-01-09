import React, { useRef, useState } from "react";
import { View, Text, StyleSheet, SafeAreaView } from "react-native";
import { COLORS } from "../constants";
import AppHeader from "../components/Header/AppHeader";
import { Formik } from "formik";
import { expenseValidationSchema } from "../schema/AddExpenseSchema";
import InputText from "../components/TextInput/InputText";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import SelectDropdown from "react-native-select-dropdown";
import { SCREEN_WIDTH } from "../constants/theme";
import SubmitButton from "../components/Button/SubmitButton";
import DateInput from "../components/DateInput/DateInput";
import { useDispatch } from "react-redux";
import { addExpense, updateExpense } from "../slices/expensesSlice";
import { useNavigation } from "@react-navigation/native";

const AddExpense = (props: any) => {
  const { expenseData } = props?.route?.params;
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const amountRef = useRef<any>();
  const categoriesRef = useRef<any>();
  const [activeInputField, setActiveInputField] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const renderDropDownButton = (selectedItem: any, isOpened: boolean) => {
    return (
      <View
        style={[
          styles.dropDownContainer,
          {
            borderBottomLeftRadius: isOpened ? 0 : wp(3),
            borderBottomRightRadius: isOpened ? 0 : wp(3),
          },
        ]}
      >
        <Text style={styles.dropDownText}>
          {selectedItem || "Choose Categories"}
        </Text>
      </View>
    );
  };

  const renderDropDownItem = (
    item: any,
    index: number,
    isSelected: boolean
  ) => {
    return (
      <>
        <View style={styles.listDropDownItemContainer}>
          <Text
            style={{
              color: COLORS.borderLines,
              fontSize: isSelected ? wp(3.5) : wp(3.4),
              fontWeight: isSelected ? "bold" : "400",
            }}
          >
            {item}
          </Text>
        </View>
      </>
    );
  };

  const addAndUpdateExpense = async (values: any) => {
    setIsLoading(true);
    if (expenseData?.id) {
      const updatedExpense = { ...values, id: expenseData.id };
      dispatch(updateExpense(updatedExpense));
    } else {
      const newExpense = { ...values, id: new Date().getTime() };
      dispatch(addExpense(newExpense));
    }

    // No need for setTimeout; this delay was added to simulate loading time and improve user experience.
    // We should handle loading state transitions properly to keep the app responsive.
    const timer = setTimeout(() => {
      setIsLoading(false);
      navigation.goBack();
    }, 1500);

    return () => clearTimeout(timer);
  };

  return (
    <Formik
      initialValues={{
        title: expenseData?.title || "",
        amount: expenseData?.amount?.toString() || "",
        category: expenseData?.category || "",
        date: expenseData?.date || "",
      }}
      validateOnMount={true}
      validationSchema={expenseValidationSchema}
      onSubmit={addAndUpdateExpense}
    >
      {({
        handleChange,
        handleBlur,
        handleSubmit,
        touched,
        values,
        setFieldValue,
        errors,
        isValid,
      }: any) => (
        <SafeAreaView style={styles.container}>
          <AppHeader
            isLogo={true}
            title={expenseData?.id ? "Update Expense" : "Add Expense"}
          />

          <View style={styles.formContainer}>
            <InputText
              name="title"
              placeHolderText={"Enter expense title"}
              isNextFocus={amountRef}
              onBlurInput={handleBlur("title")}
              onChange={handleChange("title")}
              values={values.title}
              isError={touched.title && errors.title}
              activeInputField={activeInputField}
              setActiveInputField={setActiveInputField}
            />
            {errors.title && (
              <Text style={styles.errorText}>{errors.title}</Text>
            )}

            <InputText
              name="amount"
              placeHolderText={"Enter expense amount"}
              isNextFocus={categoriesRef}
              onBlurInput={handleBlur("amount")}
              onChange={handleChange("amount")}
              values={values.amount}
              keyType={"numeric"}
              isError={touched.amount && errors.amount}
              activeInputField={activeInputField}
              setActiveInputField={setActiveInputField}
              customStyle={styles.customStyles}
            />
            {errors.amount && (
              <Text style={styles.errorText}>{errors.amount}</Text>
            )}

            <SelectDropdown
              data={["Food", "Travel", "Bills"]}
              onSelect={(selectedItem: any, index: any) => {
                setFieldValue("category", selectedItem);
              }}
              renderButton={renderDropDownButton}
              renderItem={renderDropDownItem}
              showsVerticalScrollIndicator={false}
              dropdownStyle={styles.dropDownStyle}
              defaultValue={values.category}
            />
            {errors.category && (
              <Text style={styles.errorText}>{errors.category}</Text>
            )}

            <DateInput
              name="date"
              value={values.date}
              setFieldValue={setFieldValue}
            />
            {errors.date && <Text style={styles.errorText}>{errors.date}</Text>}

            <View style={styles.customStyles}>
              <SubmitButton
                isDisable={!isValid}
                handleSubmitButton={handleSubmit}
                isLoading={isLoading}
                title={expenseData?.id ? "Update Expense" : "Add Expense"}
              />
            </View>
          </View>
        </SafeAreaView>
      )}
    </Formik>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  formContainer: {
    flex: 1,
    marginTop: wp(8),
    alignItems: "center",
  },
  customStyles: { marginTop: wp(4) },
  errorText: {
    color: COLORS.danger,
    fontSize: wp(3.6),
    width: "100%",
    marginTop: wp(0.5),
    marginStart: hp(10),
  },
  dropDownContainer: {
    backgroundColor: COLORS.inputColor,
    height: wp(12),
    width: SCREEN_WIDTH / 1.2,
    borderRadius: wp(2.4),
    paddingHorizontal: 12,
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "flex-start",
    borderWidth: 1,
    borderColor: COLORS.borderLines,
    marginTop: wp(4),
  },
  dropDownText: {
    color: COLORS.borderLines,
    fontSize: wp(3.9),
  },
  dropDownStyle: {
    backgroundColor: COLORS.inputColor,
    marginTop: -2,
    borderWidth: 1,
    borderColor: COLORS.borderLines,
    borderBottomLeftRadius: wp(3),
    borderBottomRightRadius: wp(3),
  },
  listDropDownItemContainer: {
    paddingVertical: wp(3),
    paddingHorizontal: wp(3),
    borderBottomWidth: 0.5,
    borderColor: COLORS.borderLines,
    backgroundColor: COLORS.inputColor,
  },
});

export default AddExpense;
