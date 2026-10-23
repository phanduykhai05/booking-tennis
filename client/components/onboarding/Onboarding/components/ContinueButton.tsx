import Button from "@/components/ui/Button";

type ContinueButtonProps = {
  label: string;
  onPress: () => void;
};

export default function ContinueButton({ label, onPress }: ContinueButtonProps) {
  return (
    <div className="border-t border-slate-100 px-4 pb-6 pt-4">
      <Button fullWidth label={label} onPress={onPress} size="large" />
    </div>
  );
}
