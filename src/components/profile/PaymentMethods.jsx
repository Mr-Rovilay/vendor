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
    <Card className="w-full max-w-4xl mx-auto bg-white shadow-lg">
      <CardHeader className="border-b border-gray-100">
        <div className="flex flex-col justify-between space-y-4 md:flex-row md:items-center md:space-y-0">
          <CardTitle className="flex items-center text-lg font-semibold text-gray-900 md:text-xl">
            <CreditCard className="w-6 h-6 mr-2 text-emerald-600" />
            Payment Methods
          </CardTitle>
          <Dialog>
            <DialogTrigger asChild>
              <Button 
                variant="outline" 
                className="w-full transition-colors md:w-auto hover:bg-emerald-50 hover:text-emerald-600 hover:border-emerald-200"
              >
                <Plus className="w-4 h-4 mr-2" /> Add Payment Method
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle className="text-xl font-semibold text-gray-900">Add New Payment Method</DialogTitle>
              </DialogHeader>
              <div className="mt-6 space-y-6">
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-gray-700">Card Number</Label>
                  <Input 
                    placeholder="1234 5678 9012 3456"
                    value={newCard.cardNumber}
                    onChange={(e) => setNewCard({ ...newCard, cardNumber: e.target.value })}
                    className="focus:ring-emerald-500 focus:border-emerald-500"
                  />
                </div>
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-gray-700">Card Holder</Label>
                    <Input 
                      placeholder="John Doe"
                      value={newCard.cardHolder}
                      onChange={(e) => setNewCard({ ...newCard, cardHolder: e.target.value })}
                      className="focus:ring-emerald-500 focus:border-emerald-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-gray-700">Expiry Date</Label>
                    <Input 
                      placeholder="MM/YY"
                      value={newCard.expiryDate}
                      onChange={(e) => setNewCard({ ...newCard, expiryDate: e.target.value })}
                      className="focus:ring-emerald-500 focus:border-emerald-500"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-gray-700">CVV</Label>
                  <Input 
                    placeholder="123"
                    type="password"
                    value={newCard.cvv}
                    onChange={(e) => setNewCard({ ...newCard, cvv: e.target.value })}
                    className="focus:ring-emerald-500 focus:border-emerald-500"
                  />
                </div>
                <Button 
                  onClick={handleAddCard} 
                  className="w-full text-white transition-colors bg-emerald-600 hover:bg-emerald-700"
                >
                  Add Card
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="divide-y divide-gray-100">
          {paymentMethods.map((card) => (
            <div 
              key={card.id} 
              className="flex flex-col p-4 transition-colors sm:flex-row sm:items-center sm:justify-between hover:bg-gray-50"
            >
              <div className="flex items-center space-x-4">
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-emerald-100">
                  <CreditCard className="w-6 h-6 text-emerald-600" />
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-900 sm:text-base">
                    {card.type} **** {card.lastFour}
                  </div>
                  <div className="text-xs text-gray-500 sm:text-sm">
                    Expires {card.expiryDate}
                  </div>
                </div>
                {card.isDefault && (
                  <div className="flex items-center px-2 py-1 text-xs font-medium rounded-full text-emerald-700 bg-emerald-100">
                    <CheckCircle className="w-4 h-4 mr-1" />
                    Default
                  </div>
                )}
              </div>
              <div className="flex items-center mt-4 space-x-3 sm:mt-0">
                {!card.isDefault && (
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="text-xs transition-colors sm:text-sm hover:bg-emerald-50 hover:text-emerald-600 hover:border-emerald-200"
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
        </div>
      </CardContent>
    </Card>
  );
};

export default PaymentMethods;