export interface IPropsTypes {
  placeHolderText?: string;
  refs?: any;
  isSecure?: boolean;
  onChange: any;
  isAutoFocus?: boolean;
  isNextFocus?: any;
  keyType?: any;
  textContainer?: any;
  values: string;
  maxLength?: number;
  onBlurInput?: any;
  numOfLine?: number;
  isMultiLine?: boolean;
  isError?: any;
  isEditable?: boolean;
  customStyle?: any;
  isTouch?: boolean;
  setActiveInputField?: any;
  name?: string;
  activeInputField?: string;
}

export interface IHeaderProps {
  isBack?: boolean;
  isLogo?: boolean;
  isClose?: boolean;
  isAction?: boolean;
  title?: string;
  onClose?: () => {};
  onAction?: () => {};
}

export interface ISubmitButton {
  isDisable?: boolean;
  handleSubmitButton?: () => void;
  isLoading?: boolean;
  title?: string;
}

export interface IDateInputProps {
  value: string;
  setFieldValue: (field: string, value: string) => void;
  name: string;
}

export interface IExpenseCardProps {
  data: {
    amount: string | number;
    title: string;
    category: string;
    date: string;
  };
  onPress: () => void;
  onDeleteExpense: () => void;
}

export interface IExpenseData {
  id?: number;
  title: string;
  amount: number | string;
  category: string;
  date: string;
}
