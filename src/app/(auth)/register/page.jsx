import styles from "./register.module.css";
import RegisterForm from "@/components/registerForm/registerForm";
const registerpage = () => {
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <RegisterForm />
      </div>
    </div>
  );
};

export default registerpage;
