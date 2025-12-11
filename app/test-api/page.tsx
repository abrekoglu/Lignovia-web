"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

interface TestResult {
  test: string;
  status: number;
  data: any;
  timestamp: string;
  category: string;
}

export default function TestAPIPage() {
  const [results, setResults] = useState<TestResult[]>([]);
  const [productId, setProductId] = useState("");
  const [isLoading, setIsLoading] = useState<string | null>(null);
  const [expandedResults, setExpandedResults] = useState<Set<number>>(
    new Set()
  );
  const [testEmail, setTestEmail] = useState("test@example.com");
  const [testPassword, setTestPassword] = useState("test123456");
  const [testName, setTestName] = useState("Test User");
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
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const clearResults = () => {
    setResults([]);
    setExpandedResults(new Set());
    setProductId("");
  };

  const addResult = (
    test: string,
    status: number,
    data: any,
    category: string
  ) => {
    const newResult: TestResult = {
      test,
      status,
      data,
      timestamp: new Date().toLocaleTimeString("tr-TR"),
      category,
    };
    setResults((prev) => [newResult, ...prev]);
  };

  // ============================================
  // PRODUCT APIs
  // ============================================

  const testGetProducts = async () => {
    setIsLoading("get-products");
    try {
      const res = await fetch("/api/products?page=1&limit=5");
      const data = await res.json();
      addResult("GET /api/products", res.status, data, "Products");
    } catch (error) {
      addResult("GET /api/products", 0, { error: String(error) }, "Products");
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
      addResult("POST /api/products", res.status, data, "Products");
      if (data.data?.id) {
        setProductId(data.data.id);
      }
    } catch (error) {
      addResult("POST /api/products", 0, { error: String(error) }, "Products");
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
      addResult("GET /api/products/[id]", res.status, data, "Products");
    } catch (error) {
      addResult(
        "GET /api/products/[id]",
        0,
        { error: String(error) },
        "Products"
      );
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
      addResult("PATCH /api/products/[id]", res.status, data, "Products");
    } catch (error) {
      addResult(
        "PATCH /api/products/[id]",
        0,
        { error: String(error) },
        "Products"
      );
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
      addResult("DELETE /api/products/[id]", res.status, data, "Products");
      if (res.status === 200) {
        setProductId("");
      }
    } catch (error) {
      addResult(
        "DELETE /api/products/[id]",
        0,
        { error: String(error) },
        "Products"
      );
    } finally {
      setIsLoading(null);
    }
  };

  // ============================================
  // AUTHENTICATION APIs
  // ============================================

  const testRegister = async () => {
    setIsLoading("register");
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: `${Date.now()}@test.com`,
          password: testPassword,
          name: testName,
        }),
      });

      const data = await res.json();
      addResult("POST /api/auth/register", res.status, data, "Authentication");
    } catch (error) {
      addResult(
        "POST /api/auth/register",
        0,
        { error: String(error) },
        "Authentication"
      );
    } finally {
      setIsLoading(null);
    }
  };

  const testSendVerification = async () => {
    setIsLoading("send-verification");
    try {
      const res = await fetch("/api/auth/send-verification", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: testEmail }),
      });

      const data = await res.json();
      addResult(
        "POST /api/auth/send-verification",
        res.status,
        data,
        "Authentication"
      );
    } catch (error) {
      addResult(
        "POST /api/auth/send-verification",
        0,
        { error: String(error) },
        "Authentication"
      );
    } finally {
      setIsLoading(null);
    }
  };

  const testForgotPassword = async () => {
    setIsLoading("forgot-password");
    try {
      const res = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: testEmail }),
      });

      const data = await res.json();
      addResult(
        "POST /api/auth/forgot-password",
        res.status,
        data,
        "Authentication"
      );
    } catch (error) {
      addResult(
        "POST /api/auth/forgot-password",
        0,
        { error: String(error) },
        "Authentication"
      );
    } finally {
      setIsLoading(null);
    }
  };

  const testLogout = async () => {
    setIsLoading("logout");
    try {
      const res = await fetch("/api/auth/logout", {
        method: "POST",
      });

      const data = await res.json();
      addResult("POST /api/auth/logout", res.status, data, "Authentication");
    } catch (error) {
      addResult(
        "POST /api/auth/logout",
        0,
        { error: String(error) },
        "Authentication"
      );
    } finally {
      setIsLoading(null);
    }
  };

  // ============================================
  // EXTERNAL SERVICES APIs
  // ============================================

  const testCloudinary = async () => {
    setIsLoading("cloudinary");
    try {
      const res = await fetch("/api/test/cloudinary");
      const data = await res.json();
      addResult(
        "GET /api/test/cloudinary",
        res.status,
        data,
        "External Services"
      );
    } catch (error) {
      addResult(
        "GET /api/test/cloudinary",
        0,
        { error: String(error) },
        "External Services"
      );
    } finally {
      setIsLoading(null);
    }
  };

  const testResend = async () => {
    setIsLoading("resend");
    try {
      const res = await fetch("/api/test/resend");
      const data = await res.json();
      addResult("GET /api/test/resend", res.status, data, "External Services");
    } catch (error) {
      addResult(
        "GET /api/test/resend",
        0,
        { error: String(error) },
        "External Services"
      );
    } finally {
      setIsLoading(null);
    }
  };

  const testResendSendEmail = async () => {
    setIsLoading("resend-send");
    try {
      const res = await fetch("/api/test/resend", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ to: testEmail }),
      });

      const data = await res.json();
      addResult("POST /api/test/resend", res.status, data, "External Services");
    } catch (error) {
      addResult(
        "POST /api/test/resend",
        0,
        { error: String(error) },
        "External Services"
      );
    } finally {
      setIsLoading(null);
    }
  };

  const testIyzico = async () => {
    setIsLoading("iyzico");
    try {
      const res = await fetch("/api/test/iyzico");
      const data = await res.json();
      addResult("GET /api/test/iyzico", res.status, data, "External Services");
    } catch (error) {
      addResult(
        "GET /api/test/iyzico",
        0,
        { error: String(error) },
        "External Services"
      );
    } finally {
      setIsLoading(null);
    }
  };

  const testGoogleOAuth = async () => {
    setIsLoading("google-oauth");
    try {
      const res = await fetch("/api/test/google-oauth");
      const data = await res.json();
      addResult(
        "GET /api/test/google-oauth",
        res.status,
        data,
        "External Services"
      );
    } catch (error) {
      addResult(
        "GET /api/test/google-oauth",
        0,
        { error: String(error) },
        "External Services"
      );
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

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Products":
        return "border-blue-200 bg-blue-50/50 dark:border-blue-800 dark:bg-blue-900/10";
      case "Authentication":
        return "border-purple-200 bg-purple-50/50 dark:border-purple-800 dark:bg-purple-900/10";
      case "External Services":
        return "border-orange-200 bg-orange-50/50 dark:border-orange-800 dark:bg-orange-900/10";
      default:
        return "border-gray-200 bg-gray-50/50 dark:border-gray-800 dark:bg-gray-900/10";
    }
  };

  const renderTestButton = (
    label: string,
    onClick: () => void,
    loadingKey: string,
    disabled?: boolean,
    subtitle?: string
  ) => (
    <Button
      onClick={onClick}
      variant="outline"
      disabled={disabled || isLoading === loadingKey}
      className="h-auto flex-col py-3"
    >
      <span className="font-semibold">
        {isLoading === loadingKey ? "Test ediliyor..." : label}
      </span>
      {subtitle && (
        <span className="text-xs text-muted-foreground">{subtitle}</span>
      )}
    </Button>
  );

  return (
    <div className="container mx-auto p-4 md:p-8">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>API Test Sayfası</CardTitle>
              <p className="mt-1 text-sm text-muted-foreground">
                Tüm API endpoint&apos;lerini test edin. Admin yetkisi gerektiren
                endpoint&apos;ler için önce giriş yapın.
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
        <CardContent className="space-y-8">
          {/* Test Inputs */}
          <div className="rounded-md border p-4">
            <h3 className="mb-3 text-sm font-semibold">Test Parametreleri</h3>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
              <div>
                <label className="mb-1 block text-xs text-muted-foreground">
                  Email
                </label>
                <Input
                  type="email"
                  value={testEmail}
                  onChange={(e) => setTestEmail(e.target.value)}
                  placeholder="test@example.com"
                  className="h-8 text-sm"
                />
              </div>
              <div>
                <label className="mb-1 block text-xs text-muted-foreground">
                  Şifre
                </label>
                <Input
                  type="password"
                  value={testPassword}
                  onChange={(e) => setTestPassword(e.target.value)}
                  placeholder="test123456"
                  className="h-8 text-sm"
                />
              </div>
              <div>
                <label className="mb-1 block text-xs text-muted-foreground">
                  İsim
                </label>
                <Input
                  type="text"
                  value={testName}
                  onChange={(e) => setTestName(e.target.value)}
                  placeholder="Test User"
                  className="h-8 text-sm"
                />
              </div>
            </div>
          </div>

          {/* PRODUCT APIs */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="h-1 w-1 rounded-full bg-blue-500"></div>
              <h3 className="font-semibold">📦 Product APIs</h3>
            </div>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {renderTestButton(
                "GET Products",
                testGetProducts,
                "get-products",
                false,
                "List"
              )}
              {renderTestButton(
                "POST Product",
                testCreateProduct,
                "create-product",
                false,
                "Admin"
              )}
              {renderTestButton(
                "GET Product",
                testGetProduct,
                "get-product",
                !productId,
                "Detail"
              )}
              {renderTestButton(
                "PATCH Product",
                testUpdateProduct,
                "update-product",
                !productId,
                "Admin"
              )}
              {renderTestButton(
                "DELETE Product",
                testDeleteProduct,
                "delete-product",
                !productId,
                "Admin"
              )}
            </div>
            {productId && (
              <div className="rounded-md bg-blue-50 p-2 text-xs text-blue-600 dark:bg-blue-900/20 dark:text-blue-400">
                <strong>Product ID:</strong>{" "}
                <code className="rounded bg-blue-100 px-1.5 py-0.5 dark:bg-blue-900/40">
                  {productId}
                </code>
              </div>
            )}
          </div>

          {/* AUTHENTICATION APIs */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="h-1 w-1 rounded-full bg-purple-500"></div>
              <h3 className="font-semibold">🔐 Authentication APIs</h3>
            </div>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {renderTestButton(
                "Register",
                testRegister,
                "register",
                false,
                "POST"
              )}
              {renderTestButton(
                "Send Verification",
                testSendVerification,
                "send-verification",
                false,
                "POST"
              )}
              {renderTestButton(
                "Forgot Password",
                testForgotPassword,
                "forgot-password",
                false,
                "POST"
              )}
              {renderTestButton("Logout", testLogout, "logout", false, "POST")}
            </div>
          </div>

          {/* EXTERNAL SERVICES APIs */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="h-1 w-1 rounded-full bg-orange-500"></div>
              <h3 className="font-semibold">🔌 External Services APIs</h3>
            </div>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {renderTestButton(
                "Cloudinary",
                testCloudinary,
                "cloudinary",
                false,
                "GET"
              )}
              {renderTestButton(
                "Resend (Check)",
                testResend,
                "resend",
                false,
                "GET"
              )}
              {renderTestButton(
                "Resend (Send Email)",
                testResendSendEmail,
                "resend-send",
                false,
                "POST"
              )}
              {renderTestButton("iyzico", testIyzico, "iyzico", false, "GET")}
              {renderTestButton(
                "Google OAuth",
                testGoogleOAuth,
                "google-oauth",
                false,
                "GET"
              )}
            </div>
          </div>

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
                      className={`rounded-md border transition-colors ${getCategoryColor(result.category)}`}
                    >
                      {/* Result Header */}
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
                              <div className="flex items-center gap-2">
                                <span className="font-semibold">
                                  {result.test}
                                </span>
                                <span className="rounded-full bg-gray-200 px-2 py-0.5 text-xs text-gray-600 dark:bg-gray-700 dark:text-gray-300">
                                  {result.category}
                                </span>
                              </div>
                              <div className="mt-1 flex items-center gap-2 text-xs text-muted-foreground">
                                {getStatusBadge(result.status)}
                                <span>•</span>
                                <span>{result.timestamp}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </button>

                      {/* Result Content */}
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
