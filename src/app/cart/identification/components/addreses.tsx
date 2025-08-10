"use client";

import { useState } from "react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { shippingAddressTable } from "@/db/schema";
import { useShippingAddresses } from "@/hooks/queries/useShippingAddresses";

import AddressForm from "./addressForm";

interface ShippingAddress {
  id: string;
  recipientName: string;
  street: string;
  number: string;
  complement: string | null;
  neighborhood: string;
  city: string;
  state: string;
}

interface AddressesProps {
  shippingAddresses?: (typeof shippingAddressTable.$inferSelect)[];
}

const Addresses = ({ shippingAddresses }: AddressesProps = {}) => {
  const [selectedAddress, setSelectedAddress] = useState<string | null>(null);
  const { data: addresses = [], isLoading } = useShippingAddresses({
    initialData: shippingAddresses,
  });

  const handleAddressSuccess = () => {
    // Após salvar com sucesso, resetar a seleção para que o formulário seja fechado
    setSelectedAddress(null);
  };

  const formatAddress = (address: ShippingAddress) => {
    return `${address.street}, ${address.number}${address.complement ? `, ${address.complement}` : ""}, ${address.neighborhood}, ${address.city} - ${address.state}`;
  };

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Identificação</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Carregando endereços...</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Identificação</CardTitle>
      </CardHeader>
      <CardContent>
        <RadioGroup value={selectedAddress} onValueChange={setSelectedAddress}>
          {/* Renderizar endereços existentes */}
          {addresses.map(
            (address: typeof shippingAddressTable.$inferSelect) => (
              <Card key={address.id}>
                <CardContent>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value={address.id} id={address.id} />
                    <Label
                      htmlFor={address.id}
                      className="flex-1 cursor-pointer"
                    >
                      <div>
                        <p className="font-medium">{address.recipientName}</p>
                        <p className="text-muted-foreground text-sm">
                          {formatAddress(address)}
                        </p>
                      </div>
                    </Label>
                  </div>
                </CardContent>
              </Card>
            ),
          )}

          {/* Opção para adicionar novo endereço */}
          <Card>
            <CardContent>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="add_new_address" id="add_new_address" />
                <Label htmlFor="add_new_address">Adicionar novo endereço</Label>
              </div>
            </CardContent>
          </Card>
        </RadioGroup>

        {selectedAddress === "add_new_address" && (
          <div className="mt-4">
            <AddressForm onSuccess={handleAddressSuccess} />
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default Addresses;
