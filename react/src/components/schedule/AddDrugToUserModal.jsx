import { useState } from "react";
import { Button, Modal, Text, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";

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
            CONDITION: modelOutput && modelOutput.DISEASE ? modelOutput.DISEASE : "",
            NOTES: "",
        },
        validate: {}
    });

    const createDrug = (e) => {
        handleSubmit(form.values);
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
                    onSubmit={form.onSubmit((values, event) => {
                        handleSubmit(values);
                        handleClose();
                    })}
                >
                    <Text fz="xl" fw="700" mb="2rem" mt="2rem">
                        Enter Drug Information:
                    </Text>
                
                    
                    <TextInput
                        withAsterisk
                        label="Medication Name"
                        {...form.getInputProps("CHEMICAL")}
                        size="lg"
                        required
                    />

                    <TextInput
                        withAsterisk
                        label="Name of Doctor/Prescriber"
                        {...form.getInputProps("PRESCRIBER")}
                        size="lg"
                        required
                    />

                    <TextInput
                        withAsterisk
                        label="Pharmacy"
                        {...form.getInputProps("PHARMACY")}
                        size="lg"
                        required
                    />

                    <TextInput
                        withAsterisk
                        label="Dosage"
                        {...form.getInputProps("DOSAGE")}
                        size="lg"
                        required
                    />

                    <TextInput
                        withAsterisk
                        label="Frequency"
                        {...form.getInputProps("FREQUENCY")}
                        size="lg"
                        required
                    />

                    <TextInput
                        withAsterisk
                        label="Condition"
                        {...form.getInputProps("CONDITION")}
                        size="lg"
                        required
                    />

                    <TextInput
                        withAsterisk
                        label="Additional Notes"
                        {...form.getInputProps("NOTES")}
                        size="lg"
                        required
                    />
                    
                </form>
                <Button onClick={createDrug}>Add Drug</Button>
            </Modal>
        </div>
    );
}

export default AddDrugToUserModal;