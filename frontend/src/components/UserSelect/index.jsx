import { Controller } from "react-hook-form";
import AsyncSelect from "react-select/async";
import { useLazyFetchUsersQuery } from "../../store/Services/authAPI";
import classes from "./index.module.css";
import MultiValueLabel from "./MultiValueLabel";
import Option from "./Option";

const UserSelect = ({ name, control }) => {
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
  return (
    <div className="focus:border focus:border-accent-1">
      <Controller
        name={name}
        control={control}
        rules={{
          validate: (value) => value?.length > 2 || "Select at least 3 users",
        }}
        render={({ field }) => (
          <AsyncSelect
            {...field}
            isMulti
            placeholder="Seach here.."
            loadOptions={buildOptions}
            components={{ Option: Option, MultiValueLabel: MultiValueLabel }}
            classNamePrefix={classes.reactSelect}
            className={classes.reactSelectContainer}
            getOptionLabel={(option) => option.label.name}
            getOptionValue={(option) => option.value}
            classNames={{
              input: () => classes.input,
              menu: () => classes.menu,
              menuList: () => classes.menuList,
              valueContainer: () => classes.valueContainer,
              container: () => classes.container,
              control: () => classes.control,
              dropdownIndicator: () => classes.dropdownIndicator,
              singleValue: () => classes.singleValue,
              multiValueContainer: () => classes.multiValueContainer,
              multiValueRemove: () => classes.multiValueRemove,
              indicatorsContainer: () => classes.indicatorsContainer,
              clearIndicator: () => classes.clearIndicator,
              indicatorSeparator: () => classes.indicatorSeparator,
            }}
          />
        )}
      />
    </div>
  );
};

export default UserSelect;
