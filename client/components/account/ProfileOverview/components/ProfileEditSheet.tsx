import { useState } from "react";
import { Text, View } from "react-native";

import { profileContent } from "@/components/account/ProfileOverview/content";
import type { ProfileEditSection } from "@/components/account/ProfileOverview/types";
import Button from "@/components/ui/Button";
import { ErrorMessage } from "@/components/ui/Feedback";
import Touch from "@/components/ui/Pressable";
import Sheet from "@/components/ui/Sheet";
import TextField from "@/components/ui/TextField";
import { ApiError } from "@/lib/api/http";
import type { ApiProfile, ApiProfileUpdate } from "@/lib/api/types";

type ProfileEditSheetProps = {
  onClose: () => void;
  onSave: (body: ApiProfileUpdate) => Promise<void>;
  profile: ApiProfile;
  section: ProfileEditSection | null;
};

const genderOptions = ["Nam", "Nữ", "Khác"];

/** "" khi chưa nhập để server bỏ qua trường đó; số hợp lệ mới gửi đi. */
const toOptionalNumber = (value: string) => {
  const trimmed = value.trim();
  if (!trimmed) return undefined;

  const parsed = Number(trimmed);
  return Number.isFinite(parsed) ? Math.round(parsed) : Number.NaN;
};

const toText = (value: number | string | null) => (value === null ? "" : String(value));

const inRange = (value: number | undefined, min: number, max: number) =>
  value === undefined || (!Number.isNaN(value) && value >= min && value <= max);

export default function ProfileEditSheet({ onClose, onSave, profile, section }: ProfileEditSheetProps) {
  const [fullName, setFullName] = useState(profile.fullName);
  const [email, setEmail] = useState(toText(profile.email));
  const [birthYear, setBirthYear] = useState(toText(profile.birthYear));
  const [gender, setGender] = useState(toText(profile.gender));
  const [heightCm, setHeightCm] = useState(toText(profile.heightCm));
  const [weightKg, setWeightKg] = useState(toText(profile.weightKg));
  const [note, setNote] = useState(toText(profile.note));
  const [errorMessage, setErrorMessage] = useState("");
  const [isSaving, setSaving] = useState(false);

  const buildBody = (): ApiProfileUpdate | string => {
    if (section === "physical") {
      const height = toOptionalNumber(heightCm);
      const weight = toOptionalNumber(weightKg);

      if (!inRange(height, 50, 260)) return profileContent.heightError;
      if (!inRange(weight, 20, 300)) return profileContent.weightError;

      return { heightCm: height, weightKg: weight };
    }

    if (section === "note") return { note: note.trim() };

    const year = toOptionalNumber(birthYear);
    const trimmedName = fullName.trim();

    if (trimmedName.length < 2) return profileContent.nameError;
    if (!inRange(year, 1900, 2100)) return profileContent.birthYearError;

    return {
      birthYear: year,
      fullName: trimmedName,
      gender: gender.trim() || undefined,
      // Server từ chối chuỗi rỗng vì phải là email hợp lệ; bỏ trống thì không gửi.
      ...(email.trim() ? { email: email.trim() } : {}),
    };
  };

  const submit = async () => {
    const body = buildBody();

    if (typeof body === "string") {
      setErrorMessage(body);
      return;
    }

    setSaving(true);
    setErrorMessage("");

    try {
      await onSave(body);
      onClose();
    } catch (error) {
      setErrorMessage(error instanceof ApiError ? error.message : profileContent.saveError);
    } finally {
      setSaving(false);
    }
  };

  const title =
    section === "physical"
      ? profileContent.physicalTitle
      : section === "note"
        ? profileContent.specialNote
        : profileContent.personalTitle;

  return (
    <Sheet
      closeLabel={profileContent.close}
      footer={
        <Button
          fullWidth
          isLoading={isSaving}
          label={profileContent.save}
          onPress={() => void submit()}
        />
      }
      isOpen={section !== null}
      onClose={onClose}
      title={title}
    >
      <View className="gap-4">
        {section === "physical" ? (
          <>
            <TextField
              keyboardType="number-pad"
              label={profileContent.heightLabel}
              onChangeText={setHeightCm}
              placeholder="172"
              value={heightCm}
            />
            <TextField
              keyboardType="number-pad"
              label={profileContent.weightLabel}
              onChangeText={setWeightKg}
              placeholder="65"
              value={weightKg}
            />
          </>
        ) : section === "note" ? (
          <TextField
            label={profileContent.specialNote}
            multiline
            onChangeText={setNote}
            placeholder={profileContent.notePlaceholder}
            value={note}
          />
        ) : (
          <>
            <TextField
              autoCapitalize="words"
              label={profileContent.nameLabel}
              onChangeText={setFullName}
              placeholder={profileContent.namePlaceholder}
              value={fullName}
            />
            <TextField
              keyboardType="email-address"
              label={profileContent.emailLabel}
              onChangeText={setEmail}
              placeholder={profileContent.emailPlaceholder}
              textContentType="emailAddress"
              value={email}
            />
            <TextField
              keyboardType="number-pad"
              label={profileContent.yearLabel}
              onChangeText={setBirthYear}
              placeholder="2000"
              value={birthYear}
            />

            <View>
              <Text className="mb-2.5 text-[16px] font-bold text-[#034f30]">{profileContent.genderLabel}</Text>
              <View className="flex-row gap-2">
                {genderOptions.map((option) => (
                  <Touch
                    className={`h-10 flex-1 items-center justify-center rounded-md border ${gender === option ? "border-[#008447] bg-[#e5f8ee]" : "border-[#d6d6d6] bg-white"}`}
                    key={option}
                    onPress={() => setGender(gender === option ? "" : option)}
                  >
                    <Text className={`text-[14px] ${gender === option ? "font-bold text-[#007b44]" : "text-[#68716d]"}`}>
                      {option}
                    </Text>
                  </Touch>
                ))}
              </View>
            </View>
          </>
        )}

        {errorMessage ? <ErrorMessage text={errorMessage} /> : null}
      </View>
    </Sheet>
  );
}
