import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useState } from "react";
import type { FieldError, SubmitHandler } from "react-hook-form";
import { Controller, useForm } from "react-hook-form";
import Select from "react-select";
import { Button } from "src/component/Button";
import { Header } from "src/component/Header";
import { Input } from "src/component/Input";
import { studentList } from "src/constants/data/studentList";
import { advantageOptions } from "src/constants/options/advantage";
import { importantOptions } from "src/constants/options/important";
import { industryOptions } from "src/constants/options/industry";
import { locationOptions } from "src/constants/options/location";
import { occupationOptions } from "src/constants/options/occupation";
import type { EditForms as Inputs } from "src/constants/types";

const Edit: NextPage = () => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<Inputs>();

  const [isLoading, setIsLoading] = useState(false);

  const update: SubmitHandler<Inputs> = async () => {
    setIsLoading(!isLoading);
    // setLoading(true);
    // const uid = currentUser.uid;
    // const timestamp = FirebaseTimestamp;
    // const userUpdateData = {
    // updated_at: timestamp,
    // firstName: data.firstName,
    // firstKana: data.firstKana,
    // lastName: data.lastName,
    // lastKana: data.lastKana,
    // university: data.university,
    // department: data.department,
    // club: data.club,
    // important: filterValue(data.important),
    // importantForSearch: arrayForSearch(data.important),
    // industries: filterValue(data.industries),
    // industriesForSearch: arrayForSearch(data.industries),
    // occupations: filterValue(data.occupations),
    // occupationsForSearch: arrayForSearch(data.occupations),
    // locations: filterValue(data.locations),
    // locationsForSearch: arrayForSearch(data.locations),
    // advantages: filterValue(data.advantages),
    // advantagesForSearch: arrayForSearch(data.advantages),
    // comment: data.comment,
    // };
    // const ref = doc(db, "users", uid);
    // await updateDoc(ref, userUpdateData).then(() => {
    //   setCurrentUser({
    //     ...currentUser,
    //     firstName: data.firstName,
    //     firstKana: data.firstKana,
    //     lastName: data.lastName,
    //     lastKana: data.lastKana,
    //     university: data.university,
    //     department: data.department,
    //     club: data.club,
    //     important: filterValue(data.important),
    //     industries: filterValue(data.industries),
    //     occupations: filterValue(data.occupations),
    //     locations: filterValue(data.locations),
    //     advantages: filterValue(data.advantages),
    //     comment: data.comment,
    //   });
    //   router.push(`/${uid}`).then(() => setLoading(false));
    //     toast.success("プロフィールを更新しました");
    //   });
  };

  const importantError = errors.important as unknown as FieldError;
  const industriesError = errors.industries as unknown as FieldError;
  const occupationsError = errors.occupations as unknown as FieldError;
  const locationsError = errors.locations as unknown as FieldError;
  const advantagesError = errors.advantages as unknown as FieldError;

  // useEffect(() => {
  //   register("important");
  // }, [register]);

  const handleLinkToTop = () => router.push(`/mypage`);

  return (
    <>
      <Header pageTitle="プロフィール編集" href={`/mypage`} />
      <div className="m-auto sm:w-2/3">
        <div className="flex justify-between pt-4 pr-4">
          <h1 className="p-2 text-lg font-bold">プロフィール編集</h1>
          <Button className="w-[100px] h-10 rounded shadow-md" onClick={handleLinkToTop}>
            戻る
          </Button>
        </div>
        <form className="p-2" onSubmit={handleSubmit(update)}>
          <div className="space-y-3">
            <div>
              <p className="p-3 text-sm font-bold bg-gray-200">姓名</p>
              <div className="bg-white border border-gray-200">
                <div className="flex justify-center mx-4 sm: sm:justify-start">
                  <input
                    placeholder="姓"
                    defaultValue={studentList[0].firstName}
                    className="p-1 mx-1 mt-2 w-40 h-10 bg-white rounded border border-gray-300"
                    {...register("firstName", { required: "姓名は必須です" })}
                  />
                  <input
                    placeholder="名"
                    defaultValue={studentList[0].lastName}
                    className="p-1 mx-1 mt-2 w-40 h-10 bg-white rounded border border-gray-300"
                    {...register("lastName", { required: "姓名は必須です" })}
                  />
                </div>
                <p className="mb-2 ml-4 text-sm text-red-500">
                  {errors.firstName?.message ?? errors.lastName?.message ?? null}
                </p>
              </div>
            </div>
            <div>
              <p className="p-3 text-sm font-bold bg-gray-200">姓名（かな）</p>
              <div className="bg-white border border-gray-200">
                <div className="flex justify-center mx-4 sm: sm:justify-start">
                  <input
                    placeholder="姓（かな）"
                    defaultValue={studentList[0].firstKana}
                    className="p-1 mx-1 mt-2 w-40 h-10 bg-white rounded border border-gray-300"
                    {...register("firstKana", {
                      required: "姓名（かな）は必須です",
                    })}
                  />
                  <input
                    placeholder="名（かな）"
                    defaultValue={studentList[0].lastKana}
                    className="p-1 mx-1 mt-2 w-40 h-10 bg-white rounded border border-gray-300"
                    {...register("lastKana", {
                      required: "姓名は必須です（かな）",
                    })}
                  />
                </div>
                <p className="mb-2 ml-4 text-sm text-red-500">
                  {errors.firstKana?.message ?? errors.lastKana?.message ?? null}
                </p>
              </div>
            </div>
            <Input
              label="大学名"
              placeholder="〇〇大学"
              defaultValue={studentList[0].university}
              {...register("university", {
                required: "大学名は必須です",
              })}
              error={errors.university?.message}
            />
            <Input
              label="学部"
              placeholder="〇〇学部"
              defaultValue={studentList[0].department}
              {...register("department", {
                required: "学部は必須です",
              })}
              error={errors.department?.message}
            />
            <Input
              label="部活、サークル"
              placeholder="〇〇部"
              defaultValue={studentList[0].club}
              {...register("club", {
                required: "部活、サークルは必須です",
              })}
              error={errors.club?.message}
            />
            <div>
              <p className="p-3 text-sm font-bold bg-gray-200">企業選びの軸</p>
              <div className="py-2 px-4 bg-white border border-gray-200">
                <Controller
                  name="important"
                  defaultValue={studentList[0].important.map((label: string) => ({
                    label: label,
                    value: label,
                  }))}
                  rules={{
                    required: "１つ以上選択してください",
                    validate: (value) => value.length <= 3 || "３つまで選択可能です",
                  }}
                  control={control}
                  render={({ field }) => (
                    <Select
                      id="important"
                      instanceId={"important"}
                      inputId={"important"}
                      {...field}
                      placeholder="３つまで選択"
                      isMulti
                      options={importantOptions}
                    />
                  )}
                />
                <p className="text-sm text-red-500">{importantError?.message}</p>
              </div>
            </div>
            <div>
              <p className="p-3 text-sm font-bold bg-gray-200">興味のある業界</p>
              <div className="py-2 px-4 bg-white border border-gray-200">
                <Controller
                  name="industries"
                  defaultValue={studentList[0].industries.map((label: string) => ({
                    label: label,
                    value: label,
                  }))}
                  rules={{
                    required: "１つ以上選択してください",
                    validate: (value) => value.length <= 3 || "３つまで選択可能です",
                  }}
                  control={control}
                  render={({ field }) => (
                    <Select
                      id="industries"
                      instanceId={"industries"}
                      inputId={"industries"}
                      {...field}
                      placeholder="３つまで選択"
                      isMulti
                      options={industryOptions}
                    />
                  )}
                />
                <p className="text-sm text-red-500">{industriesError?.message}</p>
              </div>
            </div>
            <div>
              <p className="p-3 text-sm font-bold bg-gray-200">興味のある職種</p>
              <div className="py-2 px-4 bg-white border border-gray-200">
                <Controller
                  name="occupations"
                  defaultValue={studentList[0].occupations.map((label: string) => ({
                    label: label,
                    value: label,
                  }))}
                  rules={{
                    required: "１つ以上選択してください",
                    validate: (value) => value.length <= 3 || "３つまで選択可能です",
                  }}
                  control={control}
                  render={({ field }) => (
                    <Select
                      id="occupations"
                      instanceId={"occupations"}
                      inputId={"occupations"}
                      {...field}
                      placeholder="３つまで選択"
                      isMulti
                      options={occupationOptions}
                    />
                  )}
                />
                <p className="text-sm text-red-500">{occupationsError?.message}</p>
              </div>
            </div>
            <div>
              <p className="p-3 text-sm font-bold bg-gray-200">希望勤務地</p>
              <div className="py-2 px-4 bg-white border border-gray-200">
                <Controller
                  name="locations"
                  defaultValue={studentList[0].locations?.map((label: string) => ({
                    label: label,
                    value: label,
                  }))}
                  rules={{
                    required: "１つ以上選択してください",
                    validate: (value) => value.length <= 3 || "３つまで選択可能です",
                  }}
                  control={control}
                  render={({ field }) => (
                    <Select
                      id="locations"
                      instanceId={"locations"}
                      inputId={"locations"}
                      {...field}
                      placeholder="３つまで選択"
                      isMulti
                      options={locationOptions}
                    />
                  )}
                />
                <p className="text-sm text-red-500">{locationsError?.message}</p>
              </div>
            </div>
            <div>
              <p className="p-3 text-sm font-bold bg-gray-200">強み</p>
              <div className="py-2 px-4 bg-white border border-gray-200">
                <Controller
                  name="advantages"
                  defaultValue={studentList[0].advantages.map((label: string) => ({
                    label: label,
                    value: label,
                  }))}
                  rules={{
                    required: "１つ以上選択してください",
                    validate: (value) => value.length <= 3 || "３つまで選択可能です",
                  }}
                  control={control}
                  render={({ field }) => (
                    <Select
                      id="advantages"
                      instanceId={"advantages"}
                      inputId={"advantages"}
                      {...field}
                      placeholder="３つまで選択"
                      isMulti
                      options={advantageOptions}
                    />
                  )}
                />
                <p className="text-sm text-red-500">{advantagesError?.message}</p>
              </div>
            </div>
            <div>
              <p className="p-3 text-sm font-bold bg-gray-200">ひとことアピール（任意）</p>
              <div className="py-2 px-4 bg-white border border-gray-200">
                <textarea
                  {...register("comment")}
                  defaultValue={studentList[0].comment}
                  placeholder="(例)誰にも負けない執着心を営業職で発揮したいです。趣味は登山です。"
                  className="p-1 w-full h-14 leading-none rounded border border-gray-300 resize-none"
                />
              </div>
            </div>
          </div>
          <br />
          <Button className="mb-4 w-full shadow-md" disabled={isLoading} onClick={handleSubmit(update)}>
            {isLoading ? "更新中" : "プロフィール情報を更新する"}
          </Button>
        </form>
      </div>
    </>
  );
};

export default Edit;
