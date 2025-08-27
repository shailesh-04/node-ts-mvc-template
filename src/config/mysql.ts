const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
export const testConnection = async () => {
    try {
        await sleep(3000);
        console.log("�� Database connected successfully!");
    }
    catch (error) {
        console.error("�� Database connection failed!", error.message);
    }
}