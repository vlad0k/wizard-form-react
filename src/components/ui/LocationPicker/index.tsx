import React, { FC } from 'react';
import classNames from './index.module.css';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import { Field, FieldProps } from 'formik';
import cn from 'classnames';

const LocationPicker: FC<LocationPickerTypeProps> = ({ name, label }) => {
  return (
    <Field name={name}>
      {({ field, form }: FieldProps) => {
        const { setFieldValue } = form;

        const handleChange = (value: string) => {
          setFieldValue(name, value);
        };

        const handleSelect = (address: string) => {
          setFieldValue(name, address);
        };

        return (
          <PlacesAutocomplete value={field.value} onChange={handleChange} onSelect={handleSelect}>
            {({ getInputProps, suggestions, loading, getSuggestionItemProps }) => (
              <div className={classNames.wrapper}>
                <span className={classNames.label}>{label}</span>
                <input
                  {...getInputProps({ className: classNames.input })}
                  name={name}
                  onBlur={field.onBlur}
                />

                {suggestions.length !== 0 && (
                  <div className={classNames.dropdown}>
                    {suggestions.map((suggestion) => {
                      const { active, description } = suggestion;
                      const className = cn(classNames.suggestion, {
                        [classNames.active]: active,
                      });
                      return (
                        <div
                          {...getSuggestionItemProps(suggestion, {
                            className,
                          })}
                        >
                          <span>{description}</span>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            )}
          </PlacesAutocomplete>
        );
      }}
    </Field>
  );
};

export default LocationPicker;

type LocationPickerTypeProps = {
  name: string;
  label: string;
};