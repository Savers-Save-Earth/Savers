import dynamic from 'next/dynamic';
import { useMemo, useRef } from 'react';

import Loading from '@/app/loading';
import ReactQuill, { ReactQuillProps } from 'react-quill';
import 'react-quill/dist/quill.snow.css';

interface ForwardedQuillComponent extends ReactQuillProps {
  forwardedRef: React.Ref<ReactQuill>;
}

// dynamic import: react-quill은 SSR을 지원하지 않음
const QuillWrapper = dynamic(
  async () => {
    const { default: QuillComponent } = await import('react-quill');
    const Quill = ({ forwardedRef, ...props }: ForwardedQuillComponent) => (
      <QuillComponent ref={forwardedRef} {...props} />
    );
    return Quill;
  },
  { loading: () => <Loading />, ssr: false },
);

const imageHandler = () => {
  // 이미지 핸들러
};

interface EditorProps {
  content: string;
  setContent: React.Dispatch<React.SetStateAction<string>>;
}

const TextEditor = ({content, setContent}: EditorProps) => {
  const quillInstance = useRef<ReactQuill>(null);

  // react-quill module - 에디터 toolbar 설정
  // useMemo: 렌더링될 때마다 모듈 객체가 새로 생성되어 cursor focus가 에디터에서 벗어나는 것 방지
  const modules = useMemo(
    () => ({
      toolbar: {
        container: [
          ["bold", "italic", "underline", "strike", "blockquote"],
          [{ size: ["small", false, "large", "huge"] }, { color: [] }],
          [
            { list: "ordered" },
            { list: "bullet" },
            { indent: "-1" },
            { indent: "+1" },
            { align: [] },
          ],
          ["image"],
        ],
        handlers: {
          image: imageHandler,
        },
      },
    }),
  
    []
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
    <QuillWrapper
      className="h-5/6"
      forwardedRef={quillInstance}
      value={content}
      onChange={setContent}
      modules={modules}
      formats={formats}
      theme="snow"
      placeholder="내용을 입력해주세요."
    />
  )
}

export default TextEditor