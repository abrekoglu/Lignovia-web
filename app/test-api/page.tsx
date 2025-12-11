"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export default function TestAPIPage() {
  const [results, setResults] = useState<any[]>([]);
  const [productId, setProductId] = useState("");
  const [categoryId] = useState("cmj1os0xc000010zivy6v8wwe"); // Test category ID

  const addResult = (test: string, status: number, data: any) => {
    console.log("Adding result:", { test, status, data });
    setResults((prev) => {
      const newResults = [
        ...prev,
        {
          test,
          status,
          data,
          timestamp: new Date().toLocaleTimeString(),
        },
      ];
      console.log("New results array:", newResults);
      return newResults;
    });
  };

  const testGetProducts = async () => {
    try {
      console.log("Testing GET /api/products...");
      const res = await fetch("/api/products?page=1&limit=5");
      const data = await res.json();
      console.log("Response:", { status: res.status, data });
      addResult("GET /api/products", res.status, data);
    } catch (error) {
      console.error("Error:", error);
      addResult("GET /api/products", 0, { error: String(error) });
    }
  };

  const testCreateProduct = async () => {
    try {
      const productData = {
        name: `Test Ürün ${Date.now()}`,
        description: "Test açıklama",
        price: 299.99,
        categoryId,
        stock: 10,
        sku: `TEST-${Date.now()}`,
      };

      const res = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(productData),
      });

      const data = await res.json();
      addResult("POST /api/products", res.status, data);
      if (data.data?.id) {
        setProductId(data.data.id);
      }
    } catch (error) {
      addResult("POST /api/products", 0, { error: String(error) });
    }
  };

  const testGetProduct = async () => {
    if (!productId) {
      alert("Önce bir ürün oluşturun!");
      return;
    }

    try {
      const res = await fetch(`/api/products/${productId}`);
      const data = await res.json();
      addResult("GET /api/products/[id]", res.status, data);
    } catch (error) {
      addResult("GET /api/products/[id]", 0, { error: String(error) });
    }
  };

  const testUpdateProduct = async () => {
    if (!productId) {
      alert("Önce bir ürün oluşturun!");
      return;
    }

    try {
      const res = await fetch(`/api/products/${productId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: `Güncellenmiş Ürün ${Date.now()}`,
          price: 349.99,
        }),
      });

      const data = await res.json();
      addResult("PATCH /api/products/[id]", res.status, data);
    } catch (error) {
      addResult("PATCH /api/products/[id]", 0, { error: String(error) });
    }
  };

  const testDeleteProduct = async () => {
    if (!productId) {
      alert("Önce bir ürün oluşturun!");
      return;
    }

    try {
      const res = await fetch(`/api/products/${productId}`, {
        method: "DELETE",
      });

      const data = await res.json();
      addResult("DELETE /api/products/[id]", res.status, data);
      if (res.status === 200) {
        setProductId("");
      }
    } catch (error) {
      addResult("DELETE /api/products/[id]", 0, { error: String(error) });
    }
  };

  return (
    <div className="container mx-auto p-8">
      <Card>
        <CardHeader>
          <CardTitle>API Test Sayfası</CardTitle>
          <p className="text-sm text-muted-foreground">
            Bu sayfa API endpoint&apos;lerini test etmek için kullanılır. Admin
            yetkisi gerektiren endpoint&apos;ler için önce giriş yapın.
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <Button onClick={testGetProducts} variant="outline">
              1. GET Products (List)
            </Button>
            <Button onClick={testCreateProduct} variant="outline">
              2. POST Product (Admin)
            </Button>
            <Button
              onClick={testGetProduct}
              variant="outline"
              disabled={!productId}
            >
              3. GET Product (Detail)
            </Button>
            <Button
              onClick={testUpdateProduct}
              variant="outline"
              disabled={!productId}
            >
              4. PATCH Product (Admin)
            </Button>
            <Button
              onClick={testDeleteProduct}
              variant="outline"
              disabled={!productId}
            >
              5. DELETE Product (Admin)
            </Button>
          </div>

          {productId && (
            <div className="rounded-md bg-blue-50 p-3 text-sm text-blue-600 dark:bg-blue-900/20 dark:text-blue-400">
              <strong>Product ID:</strong> {productId}
            </div>
          )}

          <div className="space-y-2">
            <h3 className="font-semibold">
              Test Sonuçları ({results.length}):
            </h3>
            {results.length === 0 ? (
              <div className="rounded-md border border-dashed border-gray-300 p-4 text-center text-sm text-muted-foreground dark:border-gray-700">
                Henüz test yapılmadı. Yukarıdaki butonlara tıklayarak test edin.
              </div>
            ) : (
              <div className="max-h-96 space-y-2 overflow-y-auto">
                {results.map((result, idx) => (
                  <div
                    key={idx}
                    className={`rounded-md border p-3 text-sm ${
                      result.status === 200 || result.status === 201
                        ? "border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-900/20"
                        : result.status === 0
                          ? "border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-900/20"
                          : "border-yellow-200 bg-yellow-50 dark:border-yellow-800 dark:bg-yellow-900/20"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <strong>{result.test}</strong>
                      <span className="text-xs text-muted-foreground">
                        {result.timestamp}
                      </span>
                    </div>
                    <div className="mt-1">
                      <span
                        className={`font-mono text-xs ${
                          result.status === 200 || result.status === 201
                            ? "text-green-600 dark:text-green-400"
                            : "text-red-600 dark:text-red-400"
                        }`}
                      >
                        Status: {result.status}
                      </span>
                    </div>
                    <pre className="mt-2 max-h-40 overflow-auto rounded bg-white p-2 text-xs dark:bg-gray-800">
                      {JSON.stringify(result.data, null, 2)}
                    </pre>
                  </div>
                ))}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
