import FormPersonalSms from "@/core/feature/sms/components/form-personal-sms";
import { useStyles } from "@/core/styled";

const SendPersonal = () => {
  const { styles } = useStyles();

  return (
    <section className={styles.section}>
      <FormPersonalSms />
    </section>
  );
};

export default SendPersonal;
