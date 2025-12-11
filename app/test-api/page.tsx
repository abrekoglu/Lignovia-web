"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface TestResult {
  test: string;
  status: number;
  data: any;
  timestamp: string;
}

export default function TestAPIPage() {
  const [results, setResults] = useState<TestResult[]>([]);
  const [productId, setProductId] = useState("");
  const [isLoading, setIsLoading] = useState<string | null>(null);
  const categoryId = "cmj1os0xc000010zivy6v8wwe"; // Test category ID

  const addResult = (test: string, status: number, data: any) => {
    const newResult: TestResult = {
      test,
      status,
      data,
      timestamp: new Date().toLocaleTimeString("tr-TR"),
    };
    console.log("Adding result:", newResult);
    setResults((prev) => {
      const updated = [...prev, newResult];
      console.log("Updated results:", updated.length, updated);
      return updated;
    });
  };

  const testGetProducts = async () => {
    setIsLoading("get-products");
    try {
      const res = await fetch("/api/products?page=1&limit=5");
      const data = await res.json();
      addResult("GET /api/products", res.status, data);
    } catch (error) {
      addResult("GET /api/products", 0, { error: String(error) });
    } finally {
      setIsLoading(null);
    }
  };

  const testCreateProduct = async () => {
    setIsLoading("create-product");
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
    } finally {
      setIsLoading(null);
    }
  };

  const testGetProduct = async () => {
    if (!productId) {
      alert("Önce bir ürün oluşturun!");
      return;
    }

    setIsLoading("get-product");
    try {
      const res = await fetch(`/api/products/${productId}`);
      const data = await res.json();
      addResult("GET /api/products/[id]", res.status, data);
    } catch (error) {
      addResult("GET /api/products/[id]", 0, { error: String(error) });
    } finally {
      setIsLoading(null);
    }
  };

  const testUpdateProduct = async () => {
    if (!productId) {
      alert("Önce bir ürün oluşturun!");
      return;
    }

    setIsLoading("update-product");
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
    } finally {
      setIsLoading(null);
    }
  };

  const testDeleteProduct = async () => {
    if (!productId) {
      alert("Önce bir ürün oluşturun!");
      return;
    }

    setIsLoading("delete-product");
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
    } finally {
      setIsLoading(null);
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
            <Button
              onClick={testGetProducts}
              variant="outline"
              disabled={isLoading === "get-products"}
            >
              {isLoading === "get-products"
                ? "Test ediliyor..."
                : "1. GET Products (List)"}
            </Button>
            <Button
              onClick={testCreateProduct}
              variant="outline"
              disabled={isLoading === "create-product"}
            >
              {isLoading === "create-product"
                ? "Test ediliyor..."
                : "2. POST Product (Admin)"}
            </Button>
            <Button
              onClick={testGetProduct}
              variant="outline"
              disabled={!productId || isLoading === "get-product"}
            >
              {isLoading === "get-product"
                ? "Test ediliyor..."
                : "3. GET Product (Detail)"}
            </Button>
            <Button
              onClick={testUpdateProduct}
              variant="outline"
              disabled={!productId || isLoading === "update-product"}
            >
              {isLoading === "update-product"
                ? "Test ediliyor..."
                : "4. PATCH Product (Admin)"}
            </Button>
            <Button
              onClick={testDeleteProduct}
              variant="outline"
              disabled={!productId || isLoading === "delete-product"}
            >
              {isLoading === "delete-product"
                ? "Test ediliyor..."
                : "5. DELETE Product (Admin)"}
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
            <div className="mb-2 text-xs text-muted-foreground">
              Debug: results.length = {results.length}
            </div>
            {results.length === 0 ? (
              <div className="rounded-md border border-dashed border-gray-300 p-4 text-center text-sm text-muted-foreground dark:border-gray-700">
                Henüz test yapılmadı. Yukarıdaki butonlara tıklayarak test edin.
              </div>
            ) : (
              <div className="max-h-96 space-y-2 overflow-y-auto">
                {results.map((result, idx) => (
                  <div
                    key={`result-${idx}-${result.timestamp}`}
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
