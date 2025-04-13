import FormPersonalSms from "@/core/feature/sms/components/form-personal-sms";
import { Section } from "@/core/styled";
import { theme as themeContent } from "@/core/theme";

const SendPersonal = () => {
  const { token } = themeContent.useToken();

  return (
    <Section token={token}>
      <FormPersonalSms />
    </Section>
  );
};

export default SendPersonal;
