'use client'

import { type FC, useEffect, useState } from "react"
import { Controller, type Control } from "react-hook-form"

const SingleSelect: FC<{
    options: {
        label: string
        value: string
    }[],
    label: string,
    control: Control<any>,
    name: string
}> = ({ options, label, control, name }) => {
    const [selected, setSelected] = useState<string>('')
    return (
        <div className="w-full">
			<label className="text-sm mb-2 block text-secondary font-medium" htmlFor={name}>
				{label}
			</label>
            <Controller
				name={name}
				control={control}
				render={({ field: { onChange, onBlur, value, name, ref } }) => (
                <div className="inline-flex self-start gap-2 border-2 border-primary/50 rounded-full p-2">
                    {
                        options.map((option) => (
                            <button
                                onClick={() => {
                                    setSelected(option.value)
                                    onChange(option.value)
                                }}
                                key={`${name}-${option.value}`} type="button" className={`${selected === option.value ? 'bg-primary text-white' : 'text-primary bg-stroke'} font-normal rounded-full px-5 py-1.5 text-sm`} >{option.label}</button>
                        ))
                    }
                </div> )}
        />
        </div>
    )
}

export default SingleSelect
