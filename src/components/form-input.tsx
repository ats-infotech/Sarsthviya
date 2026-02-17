'use client';

import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import React, { ReactNode, useEffect, useMemo, useRef, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import {
  Control,
  ControllerRenderProps,
  FieldValues,
  Path,
  useFormContext,
  UseFormSetValue
} from 'react-hook-form';

import { cn } from '@/lib/utils';
import { Icon } from '@iconify/react';
import clsx from 'clsx';
import { format, parse } from 'date-fns';
import { CalendarIcon, Check, Clock, Search } from 'lucide-react';
import type { GroupBase, MultiValue, SingleValue } from 'react-select';
import type { LoadOptions } from 'react-select-async-paginate';
import { AsyncPaginate } from 'react-select-async-paginate';
import { IconsString } from './icons';
import { Button } from './ui/button';
import { Checkbox } from './ui/checkbox';
import { InputOTP, InputOTPGroup, InputOTPSlot } from './ui/input-otp';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from './ui/select';
import { Switch } from './ui/switch';
import { Textarea } from './ui/textarea';
import { ScrollArea } from './ui/scroll-area';
import { Separator } from './ui/separator';
import { formatHhmmssToAmPm } from '@/lib/format';

type FormInputProps<T extends FieldValues> = {
  control: Control<T>;
  name: string | Path<T>;
  label: string;
  placeholder?: string;
  type?: string;
  autoComplete?: string;
  required?: boolean;
  disabled?: boolean;
  className?: string;
  inputClassName?: string;
  labelClassName?: string;
  prefix?: ReactNode;
  suffix?: ReactNode;
  onWheel?: (e: React.WheelEvent<HTMLInputElement>) => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  isSearch?: boolean;
  isSent?: boolean;
};

export function FormInput<T extends FieldValues>({
  control,
  name,
  label,
  placeholder,
  type = 'text',
  autoComplete,
  required,
  disabled,
  className,
  inputClassName,
  labelClassName,
  prefix,
  suffix,
  onWheel,
  onKeyDown,
  onBlur,
  isSearch,
  isSent
}: FormInputProps<T>) {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === 'password';
  const inputRef = useRef<HTMLInputElement | null>(null);
  const inputType = isPassword ? (showPassword ? 'text' : 'password') : type;

  return (
    <FormField
      control={control}
      name={name as Path<T>}
      render={({ field }: { field: ControllerRenderProps<T, Path<T>> }) => (
        <FormItem className={cn('flex flex-col', className)}>
          {label && (
            <FormLabel
              className={cn(
                'text-tiny text-primary-950 gap-0.5 font-normal',
                labelClassName
              )}
            >
              {label}
              {required && <span className='text-red-500'>*</span>}
            </FormLabel>
          )}
          <FormControl>
            <div className='relative flex items-center'>
              {prefix && (
                <span className='text-muted-foreground absolute left-3'>
                  {prefix}
                </span>
              )}
              <Input
                {...field}
                ref={(el) => {
                  field.ref(el);
                  inputRef.current = el;
                }}
                type={inputType}
                placeholder={placeholder}
                autoComplete={autoComplete}
                disabled={disabled}
                className={clsx(
                  'w-full font-normal',
                  prefix && 'pl-10',
                  (suffix || isPassword) && 'pr-10',
                  inputClassName
                )}
                onWheel={onWheel}
                onKeyDown={onKeyDown}
                onBlur={onBlur}
              />
              {isSent ? (
                <Button
                  type='button'
                  onClick={() => setShowPassword((prev) => !prev)}
                  className='text-accent bg-text-primary absolute right-2 h-9.5 w-23.5 text-xs font-semibold'
                  tabIndex={-1}
                >
                  <Icon icon={IconsString?.sent} /> Sent
                </Button>
              ) : isSearch ? (
                <Button
                  type='button'
                  variant='ghost'
                  className='text-text-tertiary absolute left-0 hover:bg-transparent!'
                  tabIndex={-1}
                  onClick={() => inputRef.current?.focus()}
                >
                  <Search />
                </Button>
              ) : isPassword ? (
                <Button
                  type='button'
                  variant='ghost'
                  onClick={() => setShowPassword((prev) => !prev)}
                  className='absolute right-3 text-neutral-500 hover:text-neutral-500'
                  tabIndex={-1}
                >
                  {showPassword ? (
                    <Icon icon={IconsString?.eyeOff} width='24' height='24' />
                  ) : (
                    <Icon icon={IconsString?.eye} width='24' height='24' />
                  )}
                </Button>
              ) : (
                suffix && (
                  <span className='text-muted-foreground absolute right-3'>
                    {suffix}
                  </span>
                )
              )}
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

type Option = {
  label: string | React.ReactNode;
  value: string;
  disable?: boolean;
};

type FormSelectProps<T extends FieldValues> = {
  control: Control<T>;
  name: string | Path<T>;
  label: string;
  options: Option[];
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
  className?: string;
  triggerClassName?: string;
  onValueChange?: (value: string | number) => void;
};

export function FormSelect<T extends FieldValues>({
  control,
  name,
  label,
  options,
  placeholder = 'Select an option',
  disabled = false,
  required,
  className,
  triggerClassName,
  onValueChange
}: FormSelectProps<T>) {
  return (
    <FormField
      control={control}
      name={name as Path<T>}
      render={({ field }: { field: ControllerRenderProps<T, Path<T>> }) => (
        <FormItem className={cn('flex flex-col', className)}>
          <FormLabel className='text-tiny text-primary-950! gap-0.5 font-normal'>
            {label}
            {required && <span className='ml-0.5 text-red-500'>*</span>}
          </FormLabel>
          <FormControl>
            <Select
              disabled={disabled}
              onValueChange={(value) => {
                field.onChange(value);
                onValueChange?.(value);
              }}
              defaultValue={field.value}
              value={field.value}
            >
              <SelectTrigger className={triggerClassName || 'w-full'}>
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
              <SelectContent>
                {options.map((option) => (
                  <SelectItem
                    key={option.value}
                    value={option.value}
                    disabled={option.disable}
                  >
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

type FormDateProps<T extends FieldValues> = {
  control: Control<T>;
  name: Path<T>;
  label?: string;
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
  className?: string;
  minDate?: Date;
  maxDate?: Date;
  dateFormat?: string;
  showYearPicker?: boolean;
  showMonthYearPicker?: boolean;
  showDateTimePicker?: boolean;
};

export function FormDate<T extends FieldValues>({
  control,
  name,
  label,
  placeholder = 'Pick a date',
  disabled = false,
  required,
  className,
  minDate,
  maxDate,
  dateFormat = 'PPP',
  showYearPicker,
  showMonthYearPicker,
  showDateTimePicker
}: FormDateProps<T>) {
  const [open, setOpen] = useState(false);
  const getDisplayDateFormat = (dateFormat?: string) => {
    if (!dateFormat) return 'PPP';
    return dateFormat;
  };

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }: { field: ControllerRenderProps<T, Path<T>> }) => (
        <FormItem className={cn('flex flex-col', className)}>
          <FormLabel className='text-primary-950! text-tiny gap-0.5 font-normal'>
            {label}
            {required && <span className='ml-0.5 text-red-500'>*</span>}
          </FormLabel>
          <FormControl>
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant='outline'
                  disabled={disabled}
                  className={cn(
                    'w-full justify-start text-left font-normal',
                    !field.value && 'text-muted-foreground'
                  )}
                >
                  <CalendarIcon className='mr-2 h-4 w-4' />
                  {field.value
                    ? format(
                        new Date(field.value),
                        getDisplayDateFormat(dateFormat)
                      )
                    : placeholder}
                </Button>
              </PopoverTrigger>
              <PopoverContent className='w-auto p-0' align='start'>
                <DatePicker
                  selected={field.value ? new Date(field.value) : null}
                  onChange={(date: Date | null) => {
                    field.onChange(date);
                    if (showDateTimePicker) return;
                    setOpen(false);
                  }}
                  inline
                  disabled={disabled}
                  minDate={minDate}
                  maxDate={maxDate}
                  dateFormat={dateFormat}
                  showYearPicker={showYearPicker}
                  showMonthYearPicker={showMonthYearPicker}
                  showTimeInput={showDateTimePicker}
                  className='border-none'
                  showMonthDropdown
                  showYearDropdown
                  dropdownMode='select'
                />
                {showDateTimePicker && (
                  <div className='my-1 flex justify-end gap-2'>
                    <Button
                      variant='ghost'
                      size='sm'
                      onClick={() => setOpen(false)}
                    >
                      Done
                    </Button>
                  </div>
                )}
              </PopoverContent>
            </Popover>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
interface FormMobileProps<T extends FieldValues> {
  control: any;
  setValue: UseFormSetValue<T>;
  name: Path<T>;
  countryCodeName: Path<T>;
  label?: string;
  required?: boolean;
  disabled?: boolean;
  placeholder?: string;
  className?: string;
}

export function FormMobile<T extends FieldValues>({
  control,
  setValue,
  name,
  countryCodeName,
  label = 'Phone Number',
  required = false,
  disabled = false,
  placeholder = 'Enter phone number',
  className
}: FormMobileProps<T>) {
  const { getValues } = useFormContext(); // ✅ Use useFormContext to access getValues

  useEffect(() => {
    const style = document.createElement('style');
    style.innerHTML = `.react-tel-input .selected-flag:hover,
    .react-tel-input .selected-flag:focus,
    .react-tel-input .flag-dropdown.open .selected-flag {
      background-color: transparent !important;
    }
    .react-tel-input .selected-flag .arrow {
      display: none !important;
    }
    .react-tel-input .selected-flag {
      position: relative;
      padding-right: 1.5rem;
    }
    .react-tel-input .selected-flag::after {
      content: "";
      position: absolute;
      top: 10px;
      right: -8px;
      display: inline-block;
      width: 16px;
      height: 16px;
      background-color: var(--neutral-500);
      --svg: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath fill='%23000' d='M9.71 6.29a1 1 0 0 0-1.42 0l-5 5a1 1 0 0 0 0 1.42l5 5a1 1 0 0 0 1.42 0a1 1 0 0 0 0-1.42L5.41 12l4.3-4.29a1 1 0 0 0 0-1.42m11 5l-5-5a1 1 0 0 0-1.42 1.42l4.3 4.29l-4.3 4.29a1 1 0 0 0 0 1.42a1 1 0 0 0 1.42 0l5-5a1 1 0 0 0 0-1.42'/%3E%3C/svg%3E");
      -webkit-mask-image: var(--svg);
      mask-image: var(--svg);
      -webkit-mask-repeat: no-repeat;
      mask-repeat: no-repeat;
      -webkit-mask-size: 100% 100%;
      mask-size: 100% 100%;
      transform: rotate(90deg);
      color: var(--neutral-500);
    }`;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return (
    <FormField
      control={control}
      name={name as Path<T>}
      render={({ field }) => {
        const code = getValues(countryCodeName as Path<T>) || '';
        const fullValue = `${code}${field.value || ''}`;

        return (
          <FormItem className={className}>
            {label && (
              <FormLabel className='text-primary-950! text-tiny gap-0.5 font-normal'>
                {label}
                {required && <span className='text-red-500'>*</span>}
              </FormLabel>
            )}
            <FormControl>
              <PhoneInput
                country={'ca'}
                enableSearch
                countryCodeEditable={false}
                disableDropdown={true}
                disableCountryGuess={true}
                onlyCountries={['ca']}
                value={fullValue}
                inputClass={clsx(
                  '!w-full !border !border-input !rounded-md !text-sm !overflow-hidden',
                  disabled && '!bg-muted cursor-not-allowed'
                )}
                buttonClass='!border-0 !border-input !rounded-md !bg-transparent hover:!bg-transparent focus:!bg-transparent'
                containerClass='!bg-transparent'
                placeholder={placeholder}
                onChange={(phone, country: { dialCode: string }) => {
                  const trimmed = phone
                    .slice(country.dialCode.length)
                    .replace(/^0+/, '');

                  field.onChange(trimmed); // update mobile number
                  setValue(countryCodeName as Path<T>, country.dialCode as any); // update country code
                }}
                disabled={disabled}
                inputProps={{
                  required,
                  autoFocus: false
                }}
              />
            </FormControl>
            <FormMessage /> {/* ✅ This now shows validation error */}
          </FormItem>
        );
      }}
    />
  );
}

type FormTextareaProps<T extends FieldValues> = {
  control: Control<T>;
  name: Path<T>;
  label: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  className?: string;
  inputClassName?: string;
  labelClassName?: string;
};

export function FormTextarea<T extends FieldValues>({
  control,
  name,
  label,
  placeholder,
  required,
  disabled = false,
  className,
  inputClassName,
  labelClassName
}: FormTextareaProps<T>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={className}>
          <FormLabel className={labelClassName}>
            {label}
            {required && <span className='ml-0.5 text-red-500'>*</span>}
          </FormLabel>
          <FormControl>
            <Textarea
              placeholder={placeholder}
              {...field}
              className={clsx('w-full', inputClassName)}
              disabled={disabled}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

type FormMultiSelectProps<T extends FieldValues> = {
  control: Control<T>;
  name: Path<T>;
  label: string;
  options: Option[];
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
  className?: string;
  triggerClassName?: string;
};

export function FormMultiSelect<T extends FieldValues>({
  control,
  name,
  label,
  options,
  placeholder = 'Select options',
  disabled = false,
  required,
  className,
  triggerClassName
}: FormMultiSelectProps<T>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => {
        const selectedValues: string[] = field.value || [];

        const toggleValue = (value: string) => {
          if (selectedValues.includes(value)) {
            field.onChange(selectedValues.filter((v) => v !== value));
          } else {
            field.onChange([...selectedValues, value]);
          }
        };

        return (
          <div className={cn('space-y-2', className)}>
            <FormLabel>
              {label}{' '}
              {required && <span className='ml-0.5 text-red-500'>*</span>}
            </FormLabel>

            <Select disabled={disabled} value='' onValueChange={toggleValue}>
              <SelectTrigger className={cn('w-full', triggerClassName)}>
                <SelectValue
                  placeholder={
                    selectedValues.length > 0
                      ? options
                          .filter((opt) => selectedValues.includes(opt.value))
                          .map((opt) => opt.label)
                          .join(', ')
                      : placeholder
                  }
                />
              </SelectTrigger>

              <SelectContent>
                {options.map((option) => (
                  <SelectItem
                    key={option.value}
                    value={option.value}
                    onClick={() => toggleValue(option.value)}
                    className='flex items-center gap-2'
                  >
                    <div
                      className={cn(
                        'mr-2 flex h-4 w-4 items-center justify-center rounded-sm border',
                        selectedValues.includes(option.value)
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-background'
                      )}
                    >
                      {selectedValues.includes(option.value) && (
                        <Check className='h-3 w-3' />
                      )}
                    </div>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage />
          </div>
        );
      }}
    />
  );
}

type FormSwitchProps<T extends FieldValues> = {
  control: Control<T>;
  name: Path<T>;
  label: string;
  description?: string;
  disabled?: boolean;
  required?: boolean;
  className?: string;
};

export function FormSwitch<T extends FieldValues>({
  control,
  name,
  label,
  description,
  disabled = false,
  required,
  className
}: FormSwitchProps<T>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem
          className={cn(
            'flex flex-row items-center justify-start space-x-2',
            className
          )}
        >
          <div className='space-y-0.5'>
            <FormLabel className='text-base'>
              {label}
              {required && <span className='ml-0.5 text-red-500'>*</span>}
            </FormLabel>
            {description && (
              <div className='text-muted-foreground text-sm'>{description}</div>
            )}
          </div>
          <FormControl>
            <Switch
              checked={field.value}
              onCheckedChange={field.onChange}
              disabled={disabled}
            />
          </FormControl>
        </FormItem>
      )}
    />
  );
}
type FormRadioGroupProps<T extends FieldValues> = {
  control: Control<T>;
  name: Path<T>;
  label: string;
  options: Option[];
  required?: boolean;
  className?: string;
  subLabel?: string;
  labelClassName?: string;
  description?: string;
  radioGroupClassName?: string;
  disabled?: boolean;
  onValueChange?: (value: string | number) => void;
  showErrorMessage?: boolean;
};

export function FormRadioGroup<T extends FieldValues>({
  control,
  name,
  label,
  description,
  options,
  required,
  className,
  radioGroupClassName,
  subLabel,
  disabled,
  onValueChange,
  showErrorMessage = true
}: FormRadioGroupProps<T>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={cn('space-y-2', className)}>
          <FormLabel className='text-tiny text-primary-950! gap-0.5 font-normal'>
            {label}
            {required && <span className='text-red-500'>*</span>}
          </FormLabel>
          {subLabel && (
            <FormLabel className='text-tiny font-normal text-gray-400!'>
              {subLabel}
            </FormLabel>
          )}
          {description && (
            <span className='text-tiny -mt-2.5 font-normal'>{description}</span>
          )}
          <FormControl>
            <RadioGroup
              {...field}
              onValueChange={(value) => {
                field.onChange(value);
                onValueChange?.(value);
              }}
              defaultValue={field.value}
              className={cn('flex flex-col gap-4', radioGroupClassName)}
            >
              {options.map((option) => (
                <FormItem key={option.value} className='flex items-center'>
                  <FormControl>
                    <RadioGroupItem
                      className='border-2'
                      value={option.value}
                      id={option.value}
                      disabled={disabled}
                    />
                  </FormControl>
                  <FormLabel className='text-tiny font-normal'>
                    {option.label}
                  </FormLabel>
                </FormItem>
              ))}
            </RadioGroup>
          </FormControl>
          {showErrorMessage && <FormMessage />}
        </FormItem>
      )}
    />
  );
}

type FormCheckboxGroupProps<T extends FieldValues> = {
  control: Control<T>;
  name: Path<T>;
  label: string;
  options: Option[];
  required?: boolean;
  className?: string;
  checkboxGroupClassName?: string;
  disabled?: boolean;
};

export function FormCheckboxGroup<T extends FieldValues>({
  control,
  name,
  label,
  options,
  required,
  className,
  checkboxGroupClassName,
  disabled
}: FormCheckboxGroupProps<T>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => {
        const fieldValue: string[] = field.value || [];

        return (
          <FormItem className={cn('space-y-2', className)}>
            <FormLabel className='text-primary-950! text-tiny gap-0.5 font-normal'>
              {label}
              {required && <span className='ml-0.5 text-red-500'>*</span>}
            </FormLabel>
            <FormControl>
              <div className={cn('flex flex-col', checkboxGroupClassName)}>
                {options.map((option) => {
                  const isChecked = fieldValue.includes(option.value);

                  const toggleValue = () => {
                    if (isChecked) {
                      field.onChange(
                        fieldValue.filter((val) => val !== option.value)
                      );
                    } else {
                      field.onChange([...fieldValue, option.value]);
                    }
                  };

                  return (
                    <FormItem key={option.value} className='flex items-center'>
                      <FormControl>
                        <Checkbox
                          disabled={disabled}
                          id={option.value}
                          checked={isChecked}
                          onCheckedChange={toggleValue}
                        />
                      </FormControl>
                      <FormLabel htmlFor={option.value} className='font-normal'>
                        {option.label}
                      </FormLabel>
                    </FormItem>
                  );
                })}
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
}

type FormAsyncPaginateSelectProps<T extends FieldValues> = {
  name: Path<T>;
  control: Control<T>;
  label: string;
  required?: boolean;
  placeholder?: string;
  loadOptions: LoadOptions<Option, GroupBase<Option>, any>;
  additional: Record<string, string | number | undefined>;
  onChange?: (value: SingleValue<Option> | MultiValue<Option> | null) => void;
  isMulti?: boolean;
  isClearable?: boolean;
  styles?: any;
  className: string;
  value?: any;
  disabled?: boolean;
  backgroundColor?: string;
};

export function FormAsyncPaginateSelect<T extends FieldValues>({
  name,
  control,
  label,
  required,
  placeholder,
  loadOptions,
  additional,
  onChange,
  isMulti = false,
  isClearable = true,
  styles,
  value,
  className, // ✅ NEW
  disabled = false,
  backgroundColor = '#FFFFFF'
}: FormAsyncPaginateSelectProps<T>) {
  return (
    <FormField
      control={control}
      name={name}
      rules={{ required }}
      render={({ field }) => (
        <FormItem>
          <FormLabel>
            {label}
            {required && <span className='text-red-500'>*</span>}
          </FormLabel>
          <FormControl>
            <AsyncPaginate
              {...field}
              className={className} // ✅ HERE
              value={value || field.value}
              onChange={(value) => {
                field.onChange(value);
                onChange?.(value);
              }}
              loadOptions={loadOptions}
              defaultOptions
              isClearable={isClearable}
              isMulti={isMulti}
              placeholder={placeholder}
              additional={additional}
              isDisabled={disabled}
              styles={
                styles || {
                  control: (base: any) => ({
                    ...base,
                    backgroundColor: backgroundColor,
                    minHeight: 36,
                    fontSize: '14px',
                    color: '#000',
                    borderColor: '#e5e5e5',
                    borderRadius: '8px',
                    outline: 'none',
                    boxShadow: 'none',
                    '&:hover': {
                      outline: 'none',
                      boxShadow: 'none'
                    },
                    '&:focus': {
                      outline: 'none',
                      boxShadow: 'none'
                    },
                    '&:focus-within': {
                      outline: 'none',
                      boxShadow: 'none'
                    }
                  }),
                  placeholder: (base: any) => ({
                    ...base,
                    color: '#000'
                  }),
                  menu: (base: any) => ({
                    ...base,
                    fontSize: '14px'
                  }),
                  option: (base: any, state: any) => ({
                    ...base,
                    fontSize: '14px',
                    color: '#000000',
                    backgroundColor: state.isSelected
                      ? '#f5f5f5'
                      : state.isFocused
                        ? '#f0f0f0'
                        : 'transparent',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '0.5rem 1rem',
                    outline: 'none',
                    '&:hover': {
                      backgroundColor: '#f0f0f0',
                      color: '#000000',
                      outline: 'none'
                    },
                    '&:focus': {
                      backgroundColor: state.isFocused
                        ? '#f0f0f0'
                        : 'transparent',
                      outline: 'none'
                    },
                    '&:active': {
                      backgroundColor: '#f0f0f0',
                      outline: 'none'
                    },
                    ':after': state.isSelected
                      ? {
                          content: '"✓"',
                          marginLeft: 'auto',
                          color: '#667085'
                        }
                      : undefined
                  }),
                  singleValue: (base: any) => ({
                    ...base,
                    color: '#000000',
                    fontSize: '14px'
                  }),
                  indicatorSeparator: () => ({
                    display: 'none'
                  })
                }
              }
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

type FormOTPInputProps<T extends FieldValues> = {
  control: Control<T>;
  name: Path<T>;
  label: string;
  length?: number; // OTP length
  required?: boolean;
};

export function FormOTPInput<T extends FieldValues>({
  control,
  name,
  label,
  length = 6,
  required
}: FormOTPInputProps<T>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>
            {label}
            {required && <span className='ml-0.5 text-red-500'>*</span>}
          </FormLabel>
          <FormControl>
            <InputOTP maxLength={length} {...field} className='w-full'>
              <InputOTPGroup className='flex items-center justify-center gap-3'>
                {Array.from({ length }).map((_, index) => (
                  <InputOTPSlot
                    key={index}
                    index={index}
                    className='h-12 w-12 rounded-lg border-2 text-center text-xl font-semibold transition-all'
                  />
                ))}
              </InputOTPGroup>
            </InputOTP>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

type FormCheckboxProps<T extends FieldValues> = {
  control: Control<T>;
  name: Path<T>;
  label?: string;
  description?: string;
  required?: boolean;
  disabled?: boolean;
  className?: string;
  id?: string;
};

export function FormCheckbox<T extends FieldValues>({
  control,
  name,
  label,
  description,
  required = false,
  disabled = false,
  className,
  id
}: FormCheckboxProps<T>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => {
        const checked = !!field.value;
        const inputId = id || String(name);

        return (
          <FormItem
            className={cn(
              'flex items-start justify-between space-x-3',
              className
            )}
          >
            <div className='flex items-start space-x-3'>
              <FormControl>
                <Checkbox
                  id={inputId}
                  checked={checked}
                  disabled={disabled}
                  onCheckedChange={(val: boolean) => {
                    field.onChange(val);
                  }}
                />
              </FormControl>

              <div className='min-w-0'>
                {label && (
                  <FormLabel htmlFor={inputId} className='font-normal'>
                    {label}{' '}
                    {required && <span className='ml-0.5 text-red-500'>*</span>}
                  </FormLabel>
                )}
                {description && (
                  <div className='text-muted-foreground text-sm'>
                    {description}
                  </div>
                )}
              </div>
            </div>

            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
}

type FormTimeProps<T extends FieldValues> = {
  control: Control<T>;
  name: Path<T>;
  label?: string;
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
  className?: string;
  minTime?: string; // 'HH:mm' format e.g., '09:00'
  maxTime?: string; // 'HH:mm' format e.g., '17:00'
  stepMinutes?: number;
};

export function FormTime<T extends FieldValues>({
  control,
  name,
  label,
  placeholder = 'Select time',
  disabled = false,
  required = false,
  className,
  minTime = '00:00',
  maxTime = '23:59',
  stepMinutes = 15
}: FormTimeProps<T>) {
  const [open, setOpen] = useState(false);

  // Generate the list of time options based on props
  const timeOptions = useMemo(() => {
    const options = [];
    const currentTime = parse(minTime, 'HH:mm', new Date());
    const endTime = parse(maxTime, 'HH:mm', new Date());

    while (currentTime <= endTime) {
      options.push(format(currentTime, 'HH:mm'));
      currentTime.setMinutes(currentTime.getMinutes() + stepMinutes);
    }
    return options;
  }, [minTime, maxTime, stepMinutes]);

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => {
        const displayValue = field.value
          ? formatHhmmssToAmPm(field.value)
          : placeholder;

        return (
          <FormItem className={cn('flex flex-col', className)}>
            {label && (
              <FormLabel>
                {label}
                {required && <span className='text-red-500'>*</span>}
              </FormLabel>
            )}
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant='outline'
                  disabled={disabled}
                  className={cn(
                    'w-full justify-start text-left font-normal',
                    !field.value && 'text-muted-foreground'
                  )}
                >
                  <Clock className='mr-2 h-4 w-4' />
                  {displayValue}
                </Button>
              </PopoverTrigger>
              <PopoverContent className='w-[200px] p-0'>
                <div className='p-2'>
                  <Input
                    type='time'
                    value={field.value || ''}
                    onChange={(e) => field.onChange(e.target.value)}
                    disabled={disabled}
                  />
                </div>
                <Separator />

                <ScrollArea className='h-64'>
                  <div className='p-1'>
                    <p className='text-muted-foreground p-2 text-xs'>
                      Or select a common time:
                    </p>
                    {timeOptions.map((time) => (
                      <div
                        key={time}
                        onClick={() => {
                          field.onChange(time);
                        }}
                        className={cn(
                          'hover:bg-accent w-full cursor-pointer rounded-sm p-2 text-sm',
                          field.value === time && 'bg-accent font-semibold'
                        )}
                      >
                        {format(parse(time, 'HH:mm', new Date()), 'hh:mm a')}
                      </div>
                    ))}
                  </div>
                </ScrollArea>
                <div className='border-t p-2'>
                  <Button
                    className='w-full'
                    size='sm'
                    onClick={() => {
                      field.onChange(field.value);
                      setOpen(false);
                    }}
                  >
                    Done
                  </Button>
                </div>
              </PopoverContent>
            </Popover>
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
}
