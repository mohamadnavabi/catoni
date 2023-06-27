import Select, { Props } from "react-select";

export default function SearchableSelect(props: Props) {
  return (
    <Select
      styles={{
        control: (provided: Record<string, unknown>, state: any) => ({
          ...provided,
          borderRadius: "1rem",
          height: "2.75rem",
          border: state.isFocused
            ? "1px solid rgba(125, 211, 252)"
            : "1px solid rgba(229, 231, 235)",
          boxShadow: state.isFocused
            ? "0px 0px 6px rgba(125, 211, 252)"
            : "none",
          "&:hover": {
            border: "1px solid rgba(125, 211, 252)",
            boxShadow: "0px 0px 6px rgba(125, 211, 252)",
          },
          paddingRight: "0.5rem",
          "*": {
            boxShadow: "none !important",
          },
        }),
        option: (styles, { data, isDisabled, isFocused, isSelected }) => ({
          ...styles,
          backgroundColor: isDisabled
            ? undefined
            : isSelected
            ? "rgba(14, 165, 233)"
            : isFocused
            ? "rgba(224, 242, 254)"
            : undefined,
        }),
        indicatorSeparator: () => ({}),
      }}
      noOptionsMessage={({ inputValue }) => "موردی یافت نشد"}
      placeholder="انتخاب کنید"
      {...props}
    />
  );
}
