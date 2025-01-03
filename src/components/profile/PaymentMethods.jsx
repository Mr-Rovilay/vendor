import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { CheckCircle, CreditCard, Plus, Trash2 } from "lucide-react";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";

const PaymentMethods = () => {
  const [paymentMethods, setPaymentMethods] = useState([
    { id: 'CC1', type: 'Visa', lastFour: '4532', expiryDate: '12/25', isDefault: true },
    { id: 'CC2', type: 'Mastercard', lastFour: '7890', expiryDate: '06/26', isDefault: false }
  ]);

  const [newCard, setNewCard] = useState({ cardNumber: '', cardHolder: '', expiryDate: '', cvv: '' });

  const handleAddCard = () => {
    const cardDetails = {
      id: `CC${paymentMethods.length + 1}`,
      type: newCard.cardNumber.startsWith('4') ? 'Visa' : 'Mastercard',
      lastFour: newCard.cardNumber.slice(-4),
      expiryDate: newCard.expiryDate,
      isDefault: false
    };
    setPaymentMethods([...paymentMethods, cardDetails]);
    setNewCard({ cardNumber: '', cardHolder: '', expiryDate: '', cvv: '' });
  };

  const handleDeleteCard = (id) => setPaymentMethods(paymentMethods.filter(card => card.id !== id));

  const handleSetDefault = (id) => {
    setPaymentMethods(paymentMethods.map(card => ({
      ...card,
      isDefault: card.id === id
    })));
  };

  return (
    <Card className="p-2 md:p-4">
      <CardHeader>
        <div className="flex flex-col justify-between space-y-2 md:flex-row md:items-center md:space-y-0">
          <CardTitle className="flex items-center text-lg md:text-xl">
            <CreditCard className="w-6 h-6 mr-2" />
            Payment Methods
          </CardTitle>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" className="w-full md:w-auto">
                <Plus className="w-4 h-4 mr-2" /> Add Card
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Payment Method</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label>Card Number</Label>
                  <Input 
                    placeholder="1234 5678 9012 3456"
                    value={newCard.cardNumber}
                    onChange={(e) => setNewCard({ ...newCard, cardNumber: e.target.value })}
                  />
                </div>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <Label>Card Holder</Label>
                    <Input 
                      placeholder="John Doe"
                      value={newCard.cardHolder}
                      onChange={(e) => setNewCard({ ...newCard, cardHolder: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label>Expiry Date</Label>
                    <Input 
                      placeholder="MM/YY"
                      value={newCard.expiryDate}
                      onChange={(e) => setNewCard({ ...newCard, expiryDate: e.target.value })}
                    />
                  </div>
                </div>
                <div>
                  <Label>CVV</Label>
                  <Input 
                    placeholder="123"
                    type="password"
                    value={newCard.cvv}
                    onChange={(e) => setNewCard({ ...newCard, cvv: e.target.value })}
                  />
                </div>
                <Button onClick={handleAddCard} className="w-full">
                  Add Card
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      <CardContent>
        {paymentMethods.map((card) => (
          <div 
            key={card.id} 
            className="flex flex-col justify-between p-4 border-b sm:flex-row sm:items-center last:border-b-0 hover:bg-gray-50"
          >
            <div className="flex items-center space-x-4">
              <CreditCard className="w-6 h-6 text-gray-500" />
              <div>
                <div className="text-sm font-medium sm:text-base">
                  {card.type} **** {card.lastFour}
                </div>
                <div className="text-xs text-gray-500 sm:text-sm">
                  Expires {card.expiryDate}
                </div>
              </div>
              {card.isDefault && (
                <div className="flex items-center text-sm text-green-600">
                  <CheckCircle className="w-4 h-4 mr-1" />
                  Default
                </div>
              )}
            </div>
            <div className="flex items-center mt-2 space-x-2 sm:mt-0">
              {!card.isDefault && (
                <Button 
                  variant="outline" 
                  size="sm"
                  className="text-xs sm:text-sm"
                  onClick={() => handleSetDefault(card.id)}
                >
                  Set as Default
                </Button>
              )}
              {!card.isDefault && (
                <Button 
                  variant="destructive" 
                  size="sm"
                  className="text-xs sm:text-sm"
                  onClick={() => handleDeleteCard(card.id)}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              )}
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default PaymentMethods;
