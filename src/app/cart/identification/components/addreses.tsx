"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";

import { getCart } from "@/actions/getCart";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { shippingAddressTable } from "@/db/schema";
import { useUpdateCartShippingAddress } from "@/hooks/mutations/useUpdateCartShippingAddress";
import { UseCart } from "@/hooks/queries/useCart";
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
  initialCart?: Awaited<ReturnType<typeof getCart>>; // Optional initial cart data
}

const Addresses = ({ shippingAddresses, initialCart }: AddressesProps = {}) => {
  const [selectedAddress, setSelectedAddress] = useState<string | null>(
    initialCart?.shippingAddress?.id || null,
  );
  const { data: addresses = [], isLoading } = useShippingAddresses({
    initialData: shippingAddresses,
  });
  const updateCartShippingAddressMutation = useUpdateCartShippingAddress();
  const { data: cart } = UseCart({ initialData: initialCart });

  useEffect(() => {
    if (cart?.shippingAddress?.id) {
      setSelectedAddress(cart.shippingAddress.id);
    }
  }, [cart]);

  const handleAddressSuccess = async (newAddressId?: string) => {
    if (newAddressId) {
      try {
        await updateCartShippingAddressMutation.mutateAsync({
          shippingAddressId: newAddressId,
        });
        toast.success("Endereço selecionado para entrega!", {
          position: "top-center",
        });
      } catch (error) {
        toast.error("Erro ao vincular endereço ao carrinho");
        console.error(error);
      }
    }
    setSelectedAddress(null);
  };

  const handleGoToPayment = async () => {
    if (!selectedAddress || selectedAddress === "add_new_address") {
      toast.error("Selecione um endereço primeiro");
      return;
    }

    try {
      await updateCartShippingAddressMutation.mutateAsync({
        shippingAddressId: selectedAddress,
      });
      toast.success("Endereço selecionado para entrega!");
    } catch (error) {
      toast.error("Erro ao vincular endereço ao carrinho");
      console.error(error);
    }
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

        {/* Botão para ir ao pagamento quando um endereço existente estiver selecionado */}
        {selectedAddress && selectedAddress !== "add_new_address" && (
          <div className="mt-4">
            <Button
              onClick={handleGoToPayment}
              className="w-full"
              disabled={updateCartShippingAddressMutation.isPending}
            >
              {updateCartShippingAddressMutation.isPending
                ? "Processando..."
                : "Ir para o Pagamento"}
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default Addresses;
