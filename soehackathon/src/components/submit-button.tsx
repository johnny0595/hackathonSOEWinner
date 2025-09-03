'use client';

import { Button } from '@/components/ui/button';
import { usePredictions } from '@/hooks/use-predictions';
import { toast } from 'sonner';
import { Send, CheckCircle } from 'lucide-react';
import { useState } from 'react';

interface SubmitButtonProps {
  className?: string;
}

export function SubmitButton({ className }: SubmitButtonProps) {
  const { predictionCount } = usePredictions();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (predictionCount === 0) {
      toast.error('Please make at least one prediction before submitting');
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast.success(
        `Successfully submitted ${predictionCount} prediction${predictionCount !== 1 ? 's' : ''}!`,
        {
          description: 'Good luck with your picks!',
          icon: <CheckCircle className="h-4 w-4" />,
        }
      );
    } catch (error) {
      console.error('Failed to submit predictions:', error);
      toast.error('Failed to submit predictions. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={className}>
      <Button
        onClick={handleSubmit}
        disabled={predictionCount === 0 || isSubmitting}
        size="lg"
        className="w-full sm:w-auto min-w-[200px] font-semibold"
      >
        {isSubmitting ? (
          <>
            <div className="animate-spin rounded-full h-4 w-4 border-2 border-current border-t-transparent mr-2" />
            Submitting...
          </>
        ) : (
          <>
            <Send className="h-4 w-4 mr-2" />
            Submit Predictions ({predictionCount})
          </>
        )}
      </Button>
      
      {predictionCount === 0 && (
        <p className="text-sm text-muted-foreground mt-2 text-center sm:text-left">
          Make your predictions above to enable submission
        </p>
      )}
    </div>
  );
}