"use client"

import { Role } from "@/enum/role";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useForm } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod";
import { UserValidation } from "@/lib/validations/user";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { ChangeEvent, useState } from "react";
import { z } from "zod";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { CalendarIcon, Fullscreen } from "lucide-react";
import { Calendar } from "../ui/calendar";
import { cn, isBase64Image } from "@/lib/utils";
import { format } from "date-fns";
import Select, { StylesConfig } from 'react-select';
import { useUploadThing } from '@/lib/uploadthing'

const darkColors = {
    dark1: '#000000',
    dark2: '#121417',
    dark3: '#101012',
    dark4: '#1F1F22',
};

const lightColors = {
    light1: '#FFFFFF',
    light2: '#EFEFEF',
    light3: '#7878A3',
    light4: '#5C5C7B',
    light5: '697C89',
};

interface SkillOption {
    value: string;
    label: string;
}

const skillOptions: SkillOption[] = [
    { value: 'mentalHealth', label: 'Mental Health' },
    { value: 'sport', label: 'Sport' },
    { value: 'community', label: 'Community' },
    { value: 'health', label: 'Health' },
    { value: 'specialNeeds', label: 'Special Needs / Disabilities' },
    { value: 'eldercare', label: 'Eldercare' },
    { value: 'family', label: 'Family' },
    { value: 'environment', label: 'Environment' },
    { value: 'animal', label: 'Animal' },
    { value: 'lgbtq', label: 'LGBTQ' },
    { value: 'children', label: 'Children' },
]

const customStyles: StylesConfig<SkillOption, true> = {
    control: (provided, state) => ({
        ...provided,
        display: 'flex',
        padding: '0.5rem',
        backgroundColor: darkColors.dark1, // dark-2
        borderColor: state.isFocused ? lightColors.light3 : darkColors.dark4, // dark-4 or dark-3
        boxShadow: state.isFocused ? `0 0 0 2px ${darkColors.dark4}` : 'none',
        '&:hover': {
            borderColor: state.isFocused ? darkColors.dark4 : darkColors.dark3, // dark-4 or dark-3
        },
    }),
    multiValue: (provided) => ({
        ...provided,
        backgroundColor: lightColors.light2, // dark-3
        borderRadius: '0.375rem', // tailwind rounded-md
        padding: '0.125rem',
    }),
    multiValueLabel: (provided) => ({
        ...provided,
        color: darkColors.dark1, // dark-1
        fontWeight: '500', // tailwind font-medium
    }),
    multiValueRemove: (provided) => ({
        ...provided,
        color: darkColors.dark1, // dark-1
        '&:hover': {
            backgroundColor: darkColors.dark4, // dark-4
            color: 'white',
        },
    }),
    option: (provided, state) => ({
        ...provided,
        backgroundColor: state.isSelected
            ? lightColors.light2 // dark-4
            : state.isFocused
                ? lightColors.light4 // dark-3
                : lightColors.light2, // dark-2
        color: state.isSelected ? 'white' : darkColors.dark1, // dark-1
        padding: '0.5rem',
    }),
    menu: (provided) => ({
        ...provided,
        backgroundColor: darkColors.dark2, // dark-2
    }),
    input: (provided) => ({
        ...provided,
        color: darkColors.dark1, // dark-1
    }),
    placeholder: (provided) => ({
        ...provided,
        color: darkColors.dark1, // dark-1
    }),
    singleValue: (provided) => ({
        ...provided,
        color: darkColors.dark1, // dark-1
    }),
};

interface Props {
    user: {
        id: string;
        objectId: string;
        username: string;
        name: string;
        role: Role;
        dateOfBirth: Date;
        image: string;
        interests: [string, ...string[]];
    };
    btnTitle: string;
}

const AccountProfile = ({ user, btnTitle }: Props) => {

    const [files, setFiles] = useState<File[]>([]);
    const [date, setDate] = useState<Date>()
    const { startUpload } = useUploadThing("media");

    const form = useForm({
        resolver: zodResolver(UserValidation),
        defaultValues: {
            profile_photo: user?.image || "",
            name: user?.name || "",
            username: user?.username || "",
            role: user?.role || Role.Volunteer,
            dateOfBirth: user?.dateOfBirth || Date.now(),
            interests: []
        }
    });

    const handleImage = (
        e: ChangeEvent<HTMLInputElement>,
        fieldChange: (value: string) => void
    ) => {
        e.preventDefault();

        const fileReader = new FileReader();

        if (e.target.files && e.target.files.length > 0) {
            const file = e.target.files[0];
            setFiles(Array.from(e.target.files));

            if (!file.type.includes("image")) return;

            fileReader.onload = async (event) => {
                const imageDataUrl = event.target?.result?.toString() || "";
                fieldChange(imageDataUrl);
            };

            fileReader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (values: z.infer<typeof UserValidation>) => {
        const blob = values.profile_photo;

        const hasImageChanged = isBase64Image(blob);
        if (hasImageChanged) {
            const imgRes = await startUpload(files);

            if (imgRes && imgRes[0].url) {
                values.profile_photo = imgRes[0].url
            }
        }
        console.log(values);
    }

    return (
        <Form {...form}>
            <form
                // onSubmit={form.handleSubmit(onSubmit)}
                className="flex flex-col justify-start gap-10">
                <FormField
                    control={form.control}
                    name='profile_photo'
                    render={({ field }) => (
                        <FormItem className='flex items-center gap-4'>
                            <FormLabel className='account-form_image-label'>
                                {field.value ? (
                                    <Image
                                        src={field.value}
                                        alt='profile_icon'
                                        width={96}
                                        height={96}
                                        priority
                                        className='rounded-full object-contain'
                                    />
                                ) : (
                                    <Image
                                        src='/assets/profile.svg'
                                        alt='profile_icon'
                                        width={24}
                                        height={24}
                                        className='object-contain'
                                    />
                                )}
                            </FormLabel>
                            <FormControl className='flex-1 text-base-semibold text-gray-200'>
                                <Input
                                    type='file'
                                    accept='image/*'
                                    placeholder='Add profile photo'
                                    className='account-form_image-input'
                                    onChange={(e) => handleImage(e, field.onChange)}
                                />
                            </FormControl>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name='name'
                    render={({ field }) => (
                        <FormItem className='flex w-full flex-col gap-3'>
                            <FormLabel className='text-base-semibold text-light-2'>
                                Name
                            </FormLabel>
                            <FormControl>
                                <Input
                                    type='text'
                                    className='account-form_input no-focus'
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name='username'
                    render={({ field }) => (
                        <FormItem className='flex w-full flex-col gap-3'>
                            <FormLabel className='text-base-semibold text-light-2'>
                                Username
                            </FormLabel>
                            <FormControl>
                                <Input
                                    type='text'
                                    className='account-form_input no-focus'
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="dateOfBirth"
                    render={({ field }) => (
                        <FormItem className='flex w-full flex-col gap-3'>
                            <FormLabel className='text-base-semibold text-light-2'>Date of birth</FormLabel>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <FormControl>
                                        <Button
                                            variant={"outline"}
                                            className={cn(
                                                "w-full border border-dark-4 bg-dark-3 text-light-1 pl-3 text-left font-normal",
                                                !field.value && "text-muted-foreground"
                                            )}
                                        >
                                            {field.value ? (
                                                format(field.value, "PPP")
                                            ) : (
                                                <span >Pick a date</span>
                                            )}
                                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50 text-white" />
                                        </Button>
                                    </FormControl>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0" align="start">
                                    <Calendar
                                        mode="single"
                                        className='bg-dark-1 text-white rounded-md border-transparent aria-checked:bg-white'
                                        selected={field.value}
                                        onSelect={field.onChange}
                                        disabled={(date: Date) =>
                                            date > new Date() || date < new Date("1900-01-01")
                                        }
                                        initialFocus
                                    />
                                </PopoverContent>
                            </Popover>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="role"
                    render={({ field }) => (
                        <FormItem className='flex w-full flex-col gap-3'>
                            <FormLabel className='text-base-semibold text-light-2'>Role</FormLabel>
                            <FormControl>
                                <RadioGroup
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                    className="flex flex-col space-y-1"
                                >
                                    <FormItem className="flex items-center space-x-3 space-y-0">
                                        <FormControl>
                                            <RadioGroupItem value={Role.Volunteer} className="aria-checked:bg-light-1" />
                                        </FormControl>
                                        <FormLabel className="text-light-1 no-focus">
                                            {Role.Volunteer}
                                        </FormLabel>
                                    </FormItem>
                                    <FormItem className="flex items-center space-x-3 space-y-0">
                                        <FormControl>
                                            <RadioGroupItem value={Role.CommunityPartner} className="aria-checked:bg-light-1" />
                                        </FormControl>
                                        <FormLabel className="text-light-1 no-focus">{Role.CommunityPartner}</FormLabel>
                                    </FormItem>
                                </RadioGroup>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name='interests'
                    render={({ field }) => (
                        <FormItem
                            className='flex w-full flex-col gap-3'
                        >
                            <FormLabel className='text-base-semibold text-light-2'>Skills</FormLabel>
                            <FormControl>
                                <Select
                                    defaultValue={[skillOptions[2], skillOptions[3]]}
                                    isMulti
                                    name="interests"
                                    options={skillOptions}
                                    styles={customStyles}
                                    classNamePrefix="select"
                                />
                            </FormControl>

                        </FormItem>
                    )}
                />

                <Button type="submit" className='bg-primary-500'>Submit</Button>
            </form>
        </Form>
    )
}

export default AccountProfile;