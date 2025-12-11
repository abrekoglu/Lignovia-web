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
  const [expandedResults, setExpandedResults] = useState<Set<number>>(
    new Set()
  );
  const categoryId = "cmj1os0xc000010zivy6v8wwe"; // Test category ID

  const toggleResult = (index: number) => {
    setExpandedResults((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(index)) {
        newSet.delete(index);
      } else {
        newSet.add(index);
      }
      return newSet;
    });
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      // You could add a toast notification here
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const clearResults = () => {
    setResults([]);
    setExpandedResults(new Set());
    setProductId("");
  };

  const addResult = (test: string, status: number, data: any) => {
    const newResult: TestResult = {
      test,
      status,
      data,
      timestamp: new Date().toLocaleTimeString("tr-TR"),
    };
    setResults((prev) => [newResult, ...prev]); // En yeni üstte
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

  const getStatusBadge = (status: number) => {
    if (status === 200 || status === 201) {
      return (
        <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800 dark:bg-green-900/30 dark:text-green-300">
          {status} OK
        </span>
      );
    } else if (status === 0) {
      return (
        <span className="inline-flex items-center rounded-full bg-red-100 px-2.5 py-0.5 text-xs font-medium text-red-800 dark:bg-red-900/30 dark:text-red-300">
          Error
        </span>
      );
    } else {
      return (
        <span className="inline-flex items-center rounded-full bg-yellow-100 px-2.5 py-0.5 text-xs font-medium text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300">
          {status}
        </span>
      );
    }
  };

  return (
    <div className="container mx-auto p-4 md:p-8">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>API Test Sayfası</CardTitle>
              <p className="mt-1 text-sm text-muted-foreground">
                Bu sayfa API endpoint&apos;lerini test etmek için kullanılır.
                Admin yetkisi gerektiren endpoint&apos;ler için önce giriş
                yapın.
              </p>
            </div>
            {results.length > 0 && (
              <Button
                onClick={clearResults}
                variant="outline"
                size="sm"
                className="shrink-0"
              >
                Sonuçları Temizle
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Test Buttons */}
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            <Button
              onClick={testGetProducts}
              variant="outline"
              disabled={isLoading === "get-products"}
              className="h-auto flex-col py-3"
            >
              <span className="font-semibold">
                {isLoading === "get-products"
                  ? "Test ediliyor..."
                  : "1. GET Products"}
              </span>
              <span className="text-xs text-muted-foreground">List</span>
            </Button>
            <Button
              onClick={testCreateProduct}
              variant="outline"
              disabled={isLoading === "create-product"}
              className="h-auto flex-col py-3"
            >
              <span className="font-semibold">
                {isLoading === "create-product"
                  ? "Test ediliyor..."
                  : "2. POST Product"}
              </span>
              <span className="text-xs text-muted-foreground">Admin</span>
            </Button>
            <Button
              onClick={testGetProduct}
              variant="outline"
              disabled={!productId || isLoading === "get-product"}
              className="h-auto flex-col py-3"
            >
              <span className="font-semibold">
                {isLoading === "get-product"
                  ? "Test ediliyor..."
                  : "3. GET Product"}
              </span>
              <span className="text-xs text-muted-foreground">Detail</span>
            </Button>
            <Button
              onClick={testUpdateProduct}
              variant="outline"
              disabled={!productId || isLoading === "update-product"}
              className="h-auto flex-col py-3"
            >
              <span className="font-semibold">
                {isLoading === "update-product"
                  ? "Test ediliyor..."
                  : "4. PATCH Product"}
              </span>
              <span className="text-xs text-muted-foreground">Admin</span>
            </Button>
            <Button
              onClick={testDeleteProduct}
              variant="outline"
              disabled={!productId || isLoading === "delete-product"}
              className="h-auto flex-col py-3"
            >
              <span className="font-semibold">
                {isLoading === "delete-product"
                  ? "Test ediliyor..."
                  : "5. DELETE Product"}
              </span>
              <span className="text-xs text-muted-foreground">Admin</span>
            </Button>
          </div>

          {/* Product ID Display */}
          {productId && (
            <div className="rounded-md bg-blue-50 p-3 text-sm text-blue-600 dark:bg-blue-900/20 dark:text-blue-400">
              <strong>Product ID:</strong>{" "}
              <code className="rounded bg-blue-100 px-1.5 py-0.5 dark:bg-blue-900/40">
                {productId}
              </code>
            </div>
          )}

          {/* Results Section */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold">
                Test Sonuçları{" "}
                {results.length > 0 && (
                  <span className="text-muted-foreground">
                    ({results.length})
                  </span>
                )}
              </h3>
            </div>

            {results.length === 0 ? (
              <div className="rounded-md border border-dashed border-gray-300 p-8 text-center text-sm text-muted-foreground dark:border-gray-700">
                Henüz test yapılmadı. Yukarıdaki butonlara tıklayarak test edin.
              </div>
            ) : (
              <div className="space-y-2">
                {results.map((result, idx) => {
                  const isExpanded = expandedResults.has(idx);
                  const jsonString = JSON.stringify(result.data, null, 2);

                  return (
                    <div
                      key={`result-${idx}-${result.timestamp}`}
                      className={`rounded-md border transition-colors ${
                        result.status === 200 || result.status === 201
                          ? "border-green-200 bg-green-50/50 dark:border-green-800 dark:bg-green-900/10"
                          : result.status === 0
                            ? "border-red-200 bg-red-50/50 dark:border-red-800 dark:bg-red-900/10"
                            : "border-yellow-200 bg-yellow-50/50 dark:border-yellow-800 dark:bg-yellow-900/10"
                      }`}
                    >
                      {/* Result Header - Always Visible */}
                      <button
                        onClick={() => toggleResult(idx)}
                        className="w-full px-4 py-3 text-left"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <span className="text-lg">
                              {isExpanded ? "▼" : "▶"}
                            </span>
                            <div>
                              <div className="font-semibold">{result.test}</div>
                              <div className="mt-1 flex items-center gap-2 text-xs text-muted-foreground">
                                {getStatusBadge(result.status)}
                                <span>•</span>
                                <span>{result.timestamp}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </button>

                      {/* Result Content - Collapsible */}
                      {isExpanded && (
                        <div className="border-current/20 border-t px-4 py-3">
                          <div className="mb-2 flex items-center justify-between">
                            <span className="text-xs font-medium text-muted-foreground">
                              Response Data:
                            </span>
                            <Button
                              onClick={(e) => {
                                e.stopPropagation();
                                copyToClipboard(jsonString);
                              }}
                              variant="ghost"
                              size="sm"
                              className="h-7 text-xs"
                            >
                              📋 Kopyala
                            </Button>
                          </div>
                          <pre className="max-h-96 overflow-auto rounded-md bg-white p-3 text-xs dark:bg-gray-900">
                            {jsonString}
                          </pre>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
