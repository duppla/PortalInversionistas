interface Props {
  id: string;
  className?: string;
  placeholder?: string;
  onChange?: (value: any) => void;
  options?: { value: string; label: string }[];
}

const WordSelect = ({
  id,
  className,
  placeholder = "Empieza a escribir...",
  onChange,
  options,
}: Readonly<Props>) => {
  return (
    <>
      <input list={id} placeholder={placeholder} className={className} />
      <datalist id={id} onChange={onChange}>
        {options?.map(({ value, label }) => (
          <option key={value} value={label} />
        ))}
      </datalist>
    </>
  );
};

const DocumentSelect = ({
  id,
  className,
  onChange,
  options = [
    { value: "CC", label: "Cedula de Ciudadania" },
    { value: "CE", label: "Cedula de Extranjeria" },
    //{value: 'PA', label: 'Pasaporte'},
  ],
  placeholder = "Selecciona el tipo de documento",
}: Props) => {
  return (
    <WordSelect
      id={id}
      className={className}
      options={options}
      onChange={onChange}
      placeholder={placeholder}
    />
  );
};

export { DocumentSelect, WordSelect };
