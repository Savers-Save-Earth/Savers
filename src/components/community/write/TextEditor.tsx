import dynamic from "next/dynamic";
import { useMemo, useRef } from "react";

import Loading from "@/app/loading";
import ReactQuill, { ReactQuillProps } from "react-quill";
import "react-quill/dist/quill.snow.css";
import supabase from "@/libs/supabase";
import { ToastError } from "@/libs/toastifyAlert";

interface ForwardedQuillComponent extends ReactQuillProps {
  forwardedRef: React.Ref<ReactQuill>;
}

// dynamic import: react-quill은 SSR을 지원하지 않음
const QuillWrapper = dynamic(
  async () => {
    const { default: QuillComponent } = await import("react-quill");
    const Quill = ({ forwardedRef, ...props }: ForwardedQuillComponent) => (
      <QuillComponent ref={forwardedRef} {...props} />
    );
    return Quill;
  },
  { loading: () => <Loading />, ssr: false },
);

interface EditorProps {
  content: string;
  setContent: React.Dispatch<React.SetStateAction<string>>;
}

const TextEditor = ({ content, setContent }: EditorProps) => {
  const quillInstance = useRef<ReactQuill>(null);

  const imageHandler = () => {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();

    input.addEventListener("change", async () => {
      if (input.files) {
        const file = input.files[0];

        try {
          const { data: res, error } = await supabase.storage
            .from("community")
            .upload(`image_${Date.now()}.png`, file);

          if (error) {
            ToastError("이미지 업로드 오류");
          }

          if (res) {
            const imageUrl = res.path;

            const editor = quillInstance.current?.getEditor();
            if (editor) {
              const range = editor.getSelection();
              editor.insertEmbed(
                range?.index || 0,
                "image",
                `${process.env.NEXT_PUBLIC_SUPABASE_STORAGE_URL}/community/${imageUrl}`,
              );
              editor.setSelection((range?.index || 0) + 1, 0);
            }
          }
        } catch (error) {
          // console.log(error);
        }
      }
    });
  };

  // react-quill module - 에디터 toolbar 설정
  // useMemo: 렌더링될 때마다 모듈 객체가 새로 생성되어 cursor focus가 에디터에서 벗어나는 것 방지
  const modules = useMemo(
    () => ({
      toolbar: {
        container: [
          [{ header: [1, 2, false] }],
          ["bold", "italic", "underline", "strike", "blockquote"],
          [{ color: [] }, { background: [] }],
          [
            { list: "ordered" },
            { list: "bullet" },
            { indent: "-1" },
            { indent: "+1" },
            { align: [] },
          ],
          ["image", "link"],
        ],
        handlers: {
          image: imageHandler,
        },
      },
    }),

    [],
  );

  // react-quill formats - toolbar에 있는 기능들 formats 선언
  const formats = [
    "header",
    "font",
    "size",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
    "color",
    "align",
  ];

  return (
    <>
      <QuillWrapper
        className="md:h-[800px] h-[320px]"
        forwardedRef={quillInstance}
        value={content}
        onChange={setContent}
        modules={modules}
        formats={formats}
        theme="snow"
        placeholder="내용을 입력해주세요."
      />
    </>
  );
};

export default TextEditor;
