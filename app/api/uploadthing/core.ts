import { createUploadthing, type FileRouter } from 'uploadthing/next';

const f = createUploadthing();

export const ourFileRouter = {
  imageUploader: f({
    image: {
      maxFileSize: '4MB',
      maxFileCount: 1,
    },
  })
    .middleware(async () => {
      // ما في تسجيل دخول — كل الناس مسموح ترفع
      return { userId: 'public' };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log('Uploaded by:', metadata.userId);
      console.log('File URL:', file.ufsUrl);

      return { url: file.ufsUrl }; // مهم يرجع الرابط
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
