import { useState } from "react";
import { Button, Modal, Text, TextInput, Textarea } from "@mantine/core";
import { isNotEmpty, useForm } from "@mantine/form";

const AddDrugToUserModal = ({show, handleClose, handleSubmit, user, allUsers, modelOutput}) => {

    // const [formData, setFormData] = useState({
    //     CHEMICAL: "",
    //     PRESCRIBER: "",
    //     PHARMACY: "",
    //     FREQUENCY: "",
    //     DOSAGE: "",
    //     CONDITION: "",
    //     NOTES: "",
    // });

    const form = useForm({
        initialValues: { 
            CHEMICAL: modelOutput && modelOutput.CHEMICAL ? modelOutput.CHEMICAL : "",
            PRESCRIBER: modelOutput && modelOutput.PRESCRIBER ? modelOutput.PRESCRIBER : "",
            PHARMACY: "",
            FREQUENCY: "",
            DOSAGE: "",
            TIMES: [],
            CONDITION: modelOutput && modelOutput.DISEASE ? modelOutput.DISEASE : "",
            NOTES: "",
        },
        validate: {
            CHEMICAL: (value) => (value.length < 2 ? 'Name must have at least 2 letters' : null),
            FREQUENCY: isNotEmpty('Frequency is required'),
            DOSAGE: isNotEmpty('Dosage is required'),
        }
    });
    
    const createDrug = (e) => {
        form.reset(); // clear form
        handleSubmit(form.values);
        handleClose();
    }

    return (
        <div>
            <Modal 
                opened={show}
                onClose={handleClose}
                // title="Add New Drug"
                size="80%"
                closeOnClickOutside={false}
                overflow="inside"
            >
                <form
                    onSubmit={form.onSubmit((event) => {
                        createDrug(event);
                    })}
                >
                    <Text fz="xl" fw="700" mb="2rem">
                        Enter Drug Information:
                    </Text>
                
                    
                    <TextInput
                        withAsterisk
                        label="Medication Name"
                        placeholder="Ex: Tylenol"
                        {...form.getInputProps("CHEMICAL")}
                        size="lg"

                    />

                    <TextInput
                        label="Name of Doctor/Prescriber"
                        placeholder="Ex: Dr. John Smith"
                        {...form.getInputProps("PRESCRIBER")}
                        size="lg"
                    />

                    <TextInput
                        withAsterisk
                        label="Pharmacy"
                        placeholder="Ex: Walgreens"
                        {...form.getInputProps("PHARMACY")}
                        size="lg"
                    />

                    <TextInput
                        withAsterisk
                        label="Dosage"
                        placeholder="Ex: 500mg"
                        {...form.getInputProps("DOSAGE")}
                        size="lg"
                    />

                    <TextInput
                        withAsterisk
                        label="Frequency"
                        placeholder="Ex: 2x a day"
                        {...form.getInputProps("FREQUENCY")}
                        size="lg"
                    />

                    <TextInput
                        label="Condition"
                        placeholder="Ex: Headache"
                        {...form.getInputProps("CONDITION")}
                        size="lg"
                    />

                    <Textarea
                        label="Additional Notes"
                        placeholder="Ex: Take with food"
                        {...form.getInputProps("NOTES")}
                        size="lg"
                    />
                    <Button type="submit">Add Drug</Button>
                </form>
                
            </Modal>
        </div>
    );
}

export default AddDrugToUserModal;