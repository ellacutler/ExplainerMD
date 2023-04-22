import { useEffect } from 'react';
import { Button, Modal, Text, TextInput, Textarea } from "@mantine/core";
import { isNotEmpty, useForm} from "@mantine/form";
import { DateTimePicker } from "@mantine/dates";

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
    
    useEffect(() => {
        console.log("hey im gonna reset the form with this modelOutput:")
        console.log(modelOutput)
        if (modelOutput) {
          form.reset();
          form.setValues({
            CHEMICAL: modelOutput && modelOutput.CHEMICAL ? modelOutput.CHEMICAL : "",
            PRESCRIBER: modelOutput && modelOutput.PRESCRIBER ? modelOutput.PRESCRIBER : "",
            PHARMACY: "",
            FREQUENCY: modelOutput && modelOutput.FREQUENCY ? modelOutput.FREQUENCY : "",
            FREQUENCYN: 24,
            DOSAGE: modelOutput && modelOutput.DOSAGE ? modelOutput.DOSAGE : "",
            START_TIME: new Date(),
            CONDITION: modelOutput && modelOutput.DISEASE ? modelOutput.DISEASE : "",
            NOTES: "",
          })
          console.log("ok set some values or something")
        }
      }, [modelOutput]);

    const form = useForm({
        initialValues: { 
            CHEMICAL: "",
            PRESCRIBER: "",
            PHARMACY: "",
            FREQUENCY: "",
            FREQUENCYN: 24,
            DOSAGE: "",
            START_TIME: new Date(),
            CONDITION: "",
            NOTES: "",
        },
        validate: {
            CHEMICAL: (value) => (value.length < 2 ? 'Name must have at least 2 letters' : null),
            FREQUENCY: isNotEmpty('Frequency is required'),
            DOSAGE: isNotEmpty('Dosage is required'),
        }
    });
    
    // does this ever get run..?
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
                        Enter Medication Information:
                    </Text>
                
                    
                    <TextInput
                        withAsterisk
                        label="Medication Name"
                        placeholder="Ex: Tylenol"
                        {...form.getInputProps("CHEMICAL")}

                    />
                    <br/>
                    <TextInput
                        label="Name of Doctor/Prescriber"
                        placeholder="Ex: Dr. John Smith"
                        {...form.getInputProps("PRESCRIBER")}
                    />

                    <TextInput
                        label="Pharmacy"
                        placeholder="Ex: Walgreens"
                        {...form.getInputProps("PHARMACY")}
                    />

                    <TextInput
                        withAsterisk
                        label="Dosage"
                        placeholder="Ex: 500mg"
                        {...form.getInputProps("DOSAGE")}
                    />
                    <br/>
                    <DateTimePicker
                        defaultValue={new Date()}
                        withAsterisk
                        radius="xl"
                        label="Prescription Start Date and Time"
                        placeholder="Pick date and time"
                        {...form.getInputProps("START_TIME")}
                        onChange={(value) => form.setFieldValue("START_TIME", value)}
                    />
                    <TextInput
                        withAsterisk
                        label="Frequency"
                        placeholder="Ex: 2x a day"
                        {...form.getInputProps("FREQUENCY")}
                    />
                    <br/>
                    <TextInput
                        label="Condition"
                        placeholder="Ex: Headache"
                        {...form.getInputProps("CONDITION")}
                    />

                    <Textarea
                        label="Additional Notes"
                        placeholder="Ex: Take with food"
                        {...form.getInputProps("NOTES")}
                    />
                    <br/>
                    <Button 
                        type="submit"
                        variant='outline'
                    >
                        Add Drug
                    </Button>
                </form>
                
            </Modal>
        </div>
    );
}

export default AddDrugToUserModal;