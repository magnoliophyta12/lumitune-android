import { useState } from "react";
import RegisterStep1 from "../../components/signup/RegisterStep1";
import RegisterStep2 from "../../components/signup/RegisterStep2";
import RegisterStep3 from "../../components/signup/RegisterStep3";

export default function SignUpPage() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    username: "",
    birthDate: "",
    regionId: "",
    isArtist: false,
  });

  const updateForm = (newData: {
    email: string;
    password: string;
    username: string;
    birthDate: string;
    regionId: string;
    isArtist: boolean;
  }) => setFormData((prev) => ({ ...prev, ...newData }));
  const goNext = () => setStep((prev) => prev + 1);
  const goBack = () => setStep((prev) => prev - 1);

  return (
    <>
      {step === 1 && (
        <RegisterStep1
          onNext={goNext}
          updateForm={updateForm}
          data={formData}
        />
      )}
      {step === 2 && (
        <RegisterStep2
          onNext={goNext}
          onBack={goBack}
          updateForm={updateForm}
          data={formData}
        />
      )}
      {step === 3 && (
        <RegisterStep3
          onBack={goBack}
          updateForm={updateForm}
          data={formData}
        />
      )}
    </>
  );
}
