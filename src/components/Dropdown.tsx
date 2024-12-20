import { useId } from 'react'
import { type Control, Controller } from 'react-hook-form'
import Select from 'react-select'

const Dropdown = ({
	control,
	options,
	label,
	name,
	isMulti,
}: {
	isMulti?: boolean
	control: Control<any>
	options: { label: string; value: string }[]
	label: string
	name: string
}) => {
	return (
		<div className="w-full">
			<label className="text-sm mb-2 block text-secondary font-medium" htmlFor={name}>
				{label}
			</label>
			<Controller
				name={name}
				control={control}
				render={({ field: { onChange, onBlur, value, name, ref } }) => (
					<Select
						isMulti={isMulti}
						classNames={{
							indicatorSeparator: () => 'hidden',
							container: () => 'w-full border-2 border-primary/50 rounded-full text-secondary',
							input: () => 'text-base text-primary rounded-full rounded-[100px]',
							placeholder: () => 'text-base text-secondary',
							singleValue: () => 'text-base text-primary',
							control: () => 'rounded-[100px]',
							multiValue: () => 'rounded-[100px]',
						}}
						styles={{
							control: (base) => ({
								...base,
								borderRadius: '100px',
							}),
							multiValue: (base) => ({
								...base,
								borderRadius: '100px',
							}),
						}}
						options={options}
						value={isMulti 
							? options.filter((c) => value?.includes(c.value))
							: options.find((c) => c.value === value)}
						onChange={(val: any) => {
							if (isMulti) {
								onChange(val?.map((v: any) => v.value))
							} else {
								onChange(val?.value)
							}
						}}
					/>
				)}
				rules={{ required: false }}
			/>
		</div>
	)
}

export default Dropdown
