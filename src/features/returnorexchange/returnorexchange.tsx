'use client';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import ItemReturnSelection from './itemReturnSelection/itemReturnSelection';
import Stepper from '@/components/ui/stepper';
import { websiteText } from '@/constants/text-constants';

export default function ReturnOrExchange() {
  const queryClient = useQueryClient();

  const steps = websiteText.steps;
  const { data: currentStep = 0 } = useQuery({
    queryKey: ['step'],
    queryFn: () => queryClient.getQueryData<number>(['step']) ?? 0,
    staleTime: Infinity
  });

  const renderStepContent = (step: number) => {
    switch (step) {
      case 0:
        return <ItemReturnSelection />;
      default:
        return <ItemReturnSelection />;
    }
  };
  return (
    <div className='mx-auto w-full max-w-6xl px-5'>
      <div>
        <Stepper currentSteps={currentStep} steps={steps} />
        <div className='mt-6'>{renderStepContent(currentStep)}</div>
      </div>
    </div>
  );
}
