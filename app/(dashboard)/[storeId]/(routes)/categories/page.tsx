import prismadb from "@/lib/prismadb";
import { format } from "date-fns";
import { CategoryClient } from "./components/client";
import { CategoryColumn } from "./components/columns";

const CategoriesPage = async ({
    params
}: {
    params: { storeId: string }
}) => {
    const categories = await prismadb.category.findMany({
        where: {
            storeId: params.storeId
        },
        include: {
            billboard: true,
            icon: true // Assuming there's a relation to an `icon` model
        },
        orderBy: {
            createdAt: 'desc'
        }
    });
    

    const formattedCategories: CategoryColumn[] = categories.map((item) => ({
        id: item.id,
        name: item.name,
        billboardLabel: item.billboard?.label ?? "No label",
        iconId: item.iconId,
        iconValue: item.icon?.iconvalue ?? "default-icon", // Include actual icon value
        createdAt: format(item.createdAt, "MMMM do, yyyy")
    }));
    

    return ( 
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <CategoryClient data={formattedCategories} />
            </div>
        </div>
     );
}
 
export default CategoriesPage;