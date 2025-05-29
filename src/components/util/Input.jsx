export default function Input({ name, id, label, textarea }) {
  return (
    <>
      <label htmlFor={id}>{label}</label>
      {!textarea ? (
        <input type="text" id={id} name={name} />
      ) : (
        <textarea name={name} id={id}></textarea>
      )}
    </>
  );
}
