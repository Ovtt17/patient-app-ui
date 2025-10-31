import * as React from 'react';
import type { FC } from 'react';
import { FormProvider, useWatch } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { defineStepper } from '@stepperize/react';
import PageHeader from '@/shared/components/Header/PageHeader';
import { useAppointmentForm } from '@/modules/appointments/hooks/useAppointmentForm';
import DoctorSelector from '../components/AppointmentForm/DoctorSelector/DoctorSelector';
import DoctorSchedule from '../components/AppointmentForm/DoctorSchedule/DoctorSchedule';
import ReasonInput from '../components/AppointmentForm/ReasonInput/ReasonInput';
import { stepSchemas } from '../validations/appointmentValidations';
import { cn } from '@/lib/utils';
import { useAuth } from '@/shared/context/auth/useAuth';
import PatientSelector from '../components/AppointmentForm/PatientSelector/PatientSelector';
import { toast } from 'react-toastify';

// 🧩 Declaramos todos los pasos posibles
const { useStepper, steps, utils } = defineStepper(
  { id: 'patient', label: 'Paciente', schema: stepSchemas.patient },
  { id: 'doctor', label: 'Doctor', schema: stepSchemas.doctor },
  { id: 'schedule', label: 'Fecha y Hora', schema: stepSchemas.schedule },
  { id: 'reason', label: 'Motivo', schema: stepSchemas.reason }
);

const StepButton: FC<{ index: number; currentIndex: number; label: string; onClick: () => void }> = ({
  index,
  currentIndex,
  label,
  onClick,
}) => {
  const isActive = index === currentIndex;
  const isCompleted = index < currentIndex;

  return (
    <li className="flex items-center gap-2 flex-shrink-0">
      <Button
        type="button"
        role="tab"
        variant={isCompleted || isActive ? 'default' : 'secondary'}
        aria-current={isActive ? 'step' : undefined}
        aria-posinset={index + 1}
        aria-setsize={steps.length}
        aria-selected={isActive}
        className={cn(
          "flex w-10 h-10 items-center justify-center rounded-full font-semibold text-sm transition-colors",
          isActive
            ? "bg-gradient-to-br from-blue-500 to-purple-500 text-white shadow-md"
            : isCompleted
              ? "bg-blue-100 dark:bg-blue-800 text-blue-800 dark:text-blue-100"
              : "bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300"
        )}
        onClick={onClick}
      >
        {index + 1}
      </Button>
      <span
        className={cn(
          "text-sm font-medium transition-colors",
          isActive
            ? "text-gray-900 dark:text-white"
            : isCompleted
              ? "text-gray-700 dark:text-gray-300"
              : "text-gray-500 dark:text-gray-400"
        )}
      >
        {label}
      </span>
    </li>
  );
};

const AppointmentCreate: FC = () => {
  const { isUserPatient } = useAuth();
  const { form, onSubmit } = useAppointmentForm();
  const stepper = useStepper();

  const patientId = useWatch({ control: form.control, name: 'userId' });
  const doctorId = useWatch({ control: form.control, name: 'doctorId' });
  const appointmentStart = useWatch({ control: form.control, name: 'appointmentStart' });
  const currentIndex = utils.getIndex(stepper.current.id);

  type AppointmentField = 'userId' | 'doctorId' | 'appointmentStart' | 'reason';

  const stepFields: Record<typeof steps[number]["id"], AppointmentField[]> = {
    patient: ['userId'],
    doctor: ['doctorId'],
    schedule: ['appointmentStart'],
    reason: ['reason'],
  };

  const validateCurrentStep = async () => {
    const currentStepId = stepper.current.id;
    const fields = stepFields[currentStepId] ?? [];
    const valid = await form.trigger(fields, { shouldFocus: true });

    if (!valid) {
      const errors = form.formState.errors;
      const firstError = Object.values(errors)[0];
      const message =
        typeof firstError?.message === 'string'
          ? firstError.message
          : 'Por favor completa los campos requeridos.';
      toast.error(message);
    }

    return valid;
  };

  const handleNext = async () => {
    const valid = await validateCurrentStep();
    if (!valid) return;
    stepper.next();
  };
  
  const goToStep = async (targetIndex: number, targetId: typeof steps[number]["id"]) => {
    // si el paso es anterior o igual, simplemente navega
    if (targetIndex <= currentIndex) return stepper.goTo(targetId);

    // si es hacia adelante, valida primero
    const valid = await validateCurrentStep();
    if (valid) stepper.goTo(targetId);
  };


  const activeSteps = stepper.all.filter(step =>
    isUserPatient ? step.id !== 'patient' : true
  );

  return (
    <FormProvider {...form}>
      <PageHeader title="Agendar Nueva Cita" />
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6 p-6 md:p-8 border border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-900 shadow-sm transition-colors"
      >
        {/* Stepper Header */}
        <nav aria-label="Steps" className="mb-6">
          <ol
            className={cn(
              "flex items-center gap-4 overflow-x-auto scrollbar-none px-2 sm:px-0 max-w-full sm:justify-between sm:flex-nowrap"
            )}
          >
            {activeSteps.map((step, index, array) => (
              <React.Fragment key={step.id}>
                <StepButton
                  index={index}
                  currentIndex={currentIndex}
                  label={step.label}
                  onClick={() => goToStep(index, step.id)}

                />
                {index < array.length - 1 && (
                  <Separator
                    className={cn(
                      "flex-1 h-1 rounded-full transition-colors min-w-[40px]",
                      index < currentIndex
                        ? "bg-blue-500 dark:bg-purple-500"
                        : "bg-gray-300 dark:bg-gray-700"
                    )}
                  />
                )}
              </React.Fragment>
            ))}
          </ol>
        </nav>

        {/* Stepper Content */}
        <div className="space-y-6">
          {stepper.switch({
            patient: () => !isUserPatient && <PatientSelector />,
            doctor: () => <DoctorSelector />,
            schedule: () => (!!doctorId && <DoctorSchedule doctorId={doctorId} />),
            reason: () => <ReasonInput />,
          })}

          {/* Stepper Controls */}
          <div className="flex justify-end gap-4 mt-6">
            {!stepper.isFirst && (
              <Button
                variant="secondary"
                className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                onClick={stepper.prev}
              >
                Atrás
              </Button>
            )}
            {!stepper.isLast ? (
              <Button
                type="button"
                className={cn(
                  "px-6 py-2 rounded-lg font-medium shadow-md text-white transition-all",
                  "bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
                )}
                onClick={handleNext}
                disabled={
                  (stepper.current.id === 'schedule' && !appointmentStart) ||
                  (stepper.current.id === 'doctor' && !doctorId) ||
                  (stepper.current.id === 'patient' && !patientId)
                }
              >
                Siguiente
              </Button>
            ) : (
              <Button
                type="submit"
                className="px-6 py-2 rounded-lg font-medium shadow-md text-white transition-all bg-blue-600 hover:bg-blue-700 dark:bg-purple-600 dark:hover:bg-purple-700"
              >
                Agendar Cita
              </Button>
            )}
          </div>
        </div>
      </form>
    </FormProvider>
  );
};

export default AppointmentCreate;