
import { CreditCard, RefreshCw } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';

export const PaymentInfo = ({ data, showRefundButton, onRefundClick }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center text-lg">
          <CreditCard className="w-4 h-4 mr-2" />
          Payment Info
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p>
          Status: {data?.paymentInfo?.status ? data?.paymentInfo?.status : "Not Paid"}
        </p>
        {showRefundButton && (
          <Button onClick={onRefundClick} className="mt-4">
            <RefreshCw className="w-4 h-4 mr-2" />
            Request Refund
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

