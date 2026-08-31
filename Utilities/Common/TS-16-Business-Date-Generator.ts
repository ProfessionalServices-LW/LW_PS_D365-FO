export async function generateBusinessDate(offset: string): Promise<string>
{
        const businessDays = parseInt(offset, 10);

        if (isNaN(businessDays))
        {
                throw new Error(`Invalid business day offset: ${offset}`);
        }

        const date = new Date();

        const direction = businessDays >= 0 ? 1 : -1;
        let remainingDays = Math.abs(businessDays);

        while (remainingDays > 0)
        {
                date.setDate(date.getDate() + direction);

                const dayOfWeek = date.getDay();

                // Skip Saturday (6) and Sunday (0)
                if (dayOfWeek !== 0 && dayOfWeek !== 6)
                {
                        remainingDays--;
                }
        }

        return date.toISOString().split("T")[0];
}
