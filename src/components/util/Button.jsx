import button from "./Button.module.css";

export default function Button({ name, type, disabled }) {
  return (
    <>
      <div className={button.container}>
        <button disabled={disabled} type={type} className={button.button}>
          {name}
        </button>
      </div>
    </>
  );
}
