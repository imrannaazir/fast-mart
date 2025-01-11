import ProfileInformationForm from "@/components/forms/profile-information-form";
import ProfileUploadForm from "@/components/forms/profile-photo-upload-form";
import Page from "@/components/layout/Page";

const SettingPage = () => {
  return (
    <Page title="Settings" size={"sm"}>
      <div className="space-y-6">
        <ProfileUploadForm />
        <ProfileInformationForm />
      </div>
    </Page>
  );
};

export default SettingPage;
