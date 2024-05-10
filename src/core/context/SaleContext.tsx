import { IValidateCupom } from "core/api/coupons/couponService";
import { TNewClientBodyRequest } from "core/models/client";
import { TCouponResponse } from "core/models/coupons";
import { Validations } from "core/utils/validations";
import { useFormik } from "formik";
import {
  createContext,
  Dispatch,
  FC,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from "react";

interface IUserConditions {
  isExist: boolean;
  isExistForClient: boolean;
}

type FormContextType = {
  isLoading: boolean;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  cupom: string;
  activeStep: number; // step atual
  docValidated: boolean; //documento validado
  tempCupom: TCouponResponse; //cupom atual
  userPermissions: IUserConditions; // permissoes para a compra
  formik: ReturnType<typeof useFormik<TNewClientBodyRequest>>;
  setDocValidated: Dispatch<SetStateAction<boolean>>;
  setTempCupom: Dispatch<SetStateAction<TCouponResponse>>;
  setUserPermissions: Dispatch<SetStateAction<IUserConditions>>;
  setCupom: Dispatch<SetStateAction<string>>;
  setActiveStep: Dispatch<SetStateAction<number>>;
};

const FormContext = createContext<FormContextType | undefined>(undefined);

export const useSaleFormContext = () => {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error(
      "useFormContext deve ser utilizado dentro de um FormProvider"
    );
  }
  return context;
};

export const SaleFormProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [cupom, setCupom] = useState("");
  const [activeStep, setActiveStep] = useState(0);
  const [tempCupom, setTempCupom] = useState<TCouponResponse>(
    {} as TCouponResponse
  );
  const [docValidated, setDocValidated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [userPermissions, setUserPermissions] = useState<IUserConditions>(
    {} as IUserConditions
  );
  const formik = useFormik<TNewClientBodyRequest>({
    initialValues: {
      name: "",
      cpforcnpj: "",
      email: "",
      password: "",
      city: "",
      uf: "",
      cep: "",
      address: "",
      neighborhood: "",
      telephone: "",
      confirmPassword: "",
      cameThrough: "",
    },
    validationSchema: docValidated
      ? Validations.registerNewUserClientSchema
      : Validations.registerClientSchema,
    validateOnChange: false,
    onSubmit: (values) => {
      console.log(values);
    },
  });

  return (
    <FormContext.Provider
      value={{
        activeStep,
        setActiveStep,
        tempCupom,
        setTempCupom,
        docValidated,
        setDocValidated,
        userPermissions,
        setUserPermissions,
        formik,
        isLoading,
        setIsLoading,
        cupom,
        setCupom,
      }}
    >
      {children}
    </FormContext.Provider>
  );
};
