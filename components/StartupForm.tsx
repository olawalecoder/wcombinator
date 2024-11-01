"use client"

import {Input} from "@/components/ui/input";
import {useState} from "react";
import {Textarea} from "@/components/ui/textarea";
import {Button} from "@/components/ui/button";


const StartupForm = () => {
    const [ errors, setErrors] = useState<Record<string, string>>({});

    return (
        <form action={() => {
        }} className="startup-form">
            <div>
                <label htmlFor="title" className="startup-form_label">
                    Title
                </label>
                <Input
                    id="title"
                    name="title"
                    className="startup-form_input"
                    required
                    placeholder="Startup Title"
                />

                {errors.title && <p className="startup-form_error"> {errors.title} </p>}
            </div>

            <div>
                <label htmlFor="description" className="startup-form_label">
                    Description
                </label>
                <Textarea
                    id="description"
                    name="description"
                    className="startup-form_textarea"
                    required
                    placeholder="Startup description"
                />

                {errors.description && <p className="startup-form_error"> {errors.description} </p>}
            </div>

            <div>
                <label htmlFor="category" className="startup-form_label">
                    Category
                </label>
                <Input
                    id="category"
                    name="category"
                    className="startup-form_input"
                    required
                    placeholder="Startup category (Tech, Health, Eduction...)"
                />

                {errors.title && <p className="startup-form_error"> {errors.title} </p>}
            </div>

            <div>
                <label htmlFor="link" className="startup-form_label">
                    Image URL
                </label>
                <Input
                    id="link"
                    name="link"
                    className="startup-form_input"
                    required
                    placeholder="Paste a link to your demo or promotional media"
                />

                {errors.link && <p className="startup-form_error"> {errors.link} </p>}
            </div>

        </form>
    )
}
export default StartupForm
