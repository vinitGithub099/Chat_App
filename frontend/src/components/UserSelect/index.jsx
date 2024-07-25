import { Controller } from "react-hook-form";
import AsyncSelect from "react-select/async";
import { useLazyFetchUsersQuery } from "../../store/Services/authAPI";
import classes from "./index.module.css";
import Option from "./Option";
import ValueLabel from "./ValueLabel";

const UserSelect = ({
  name,
  control,
  isMulti = false,
  disabledOptions = [],
  validationRules
}) => {
  const [fetchUsers] = useLazyFetchUsersQuery();

  const buildOptions = async (query, callback) => {
    try {
      const res = await fetchUsers(query);
      const options = res?.data?.map((user) => ({
        value: user._id,
        label: user,
      }));
      callback(options);
    } catch (error) {
      console.log(error);
    }
  };

  const isOptionDisabled = (option) => {
    return disabledOptions?.includes(option.value);
  };

  return (
    <Controller
      name={name}
      control={control}
      rules={validationRules}
      render={({ field }) => (
        <AsyncSelect
          {...field}
          isMulti={isMulti}
          placeholder="Seach here.."
          onChange={(selected) => field.onChange(selected)}
          value={field.value}
          loadOptions={buildOptions}
          components={{
            Option: Option,
            MultiValueLabel: ValueLabel,
            SingleValue: ValueLabel,
          }}
          classNamePrefix={classes.reactSelect}
          className={classes.reactSelectContainer}
          getOptionLabel={(option) => option.label.name}
          getOptionValue={(option) => option.value}
          isOptionDisabled={isOptionDisabled}
          classNames={{
            input: () => classes.input,
            menu: () => classes.menu,
            menuList: () => classes.menuList,
            valueContainer: () => classes.valueContainer,
            container: () => classes.container,
            control: () => classes.control,
            dropdownIndicator: () => classes.dropdownIndicator,
            singleValue: () => classes.singleValue,
            multiValueRemove: () => classes.multiValueRemove,
            indicatorsContainer: () => classes.indicatorsContainer,
            clearIndicator: () => classes.clearIndicator,
            indicatorSeparator: () => classes.indicatorSeparator,
          }}
        />
      )}
    />
  );
};

export default UserSelect;
