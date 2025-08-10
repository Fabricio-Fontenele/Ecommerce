"use client";

import { useState } from "react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

import AddressForm from "./addressForm";

const Addresses = () => {
  const [selectedAddress, setSelectedAddress] = useState<string | null>(null);

  const handleAddressSuccess = () => {
    // Após salvar com sucesso, você pode implementar lógicas adicionais aqui
    console.log("Endereço salvo com sucesso!");
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Identificação</CardTitle>
      </CardHeader>
      <CardContent>
        <RadioGroup value={selectedAddress} onValueChange={setSelectedAddress}>
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
