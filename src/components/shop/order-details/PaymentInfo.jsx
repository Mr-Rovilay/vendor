import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CreditCard } from 'lucide-react';

export const PaymentInfo = ({ data }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center text-lg font-semibold">
          <CreditCard className="w-4 h-4 mr-2" /> Payment Info
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p>
          Status: {data?.paymentInfo?.status ? data?.paymentInfo?.status : "Not Paid"}
        </p>
      </CardContent>
    </Card>
  );
};

