import StudioForm from '@/admin/_components/StudioForm';

interface StudioPageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

const StudioPage = async ({ searchParams }: StudioPageProps) => {
  const params = await searchParams;

  const studioId = typeof params.studioId === 'string' ? params.studioId : null;

  return (
    <section className="mx-auto my-[5rem] max-w-[90rem] border">
      <StudioForm studioId={studioId} />
    </section>
  );
};

export default StudioPage;
