import prismadb from "@/lib/prismadb";

interface DahshboardPageProps {
    params: { storeId: string }
};

const DahshboardPage: React.FC<DahshboardPageProps> = async ({
    params
}) => {
    const store = await prismadb.store.findFirst({
        where: {
            id: params.storeId
        }
    });

    return (
        <div>
            Current Store: {store?.name}
        </div>
    );
}

export default DahshboardPage;