"use client"

import { useState } from "react"
import Link from "next/link"
import { useInView } from "@/hooks/use-in-view"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Phone, Clock } from "lucide-react"
import { OfficialAccountLink } from "@/components/official-account-link"

export function ContactForm() {
  const { ref, isInView } = useInView()
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    targetCity: "",
    industry: "",
    hasStore: "",
    storeProblem: "",
    preferGrafting: "",
    consent: false,
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [submissionInfo, setSubmissionInfo] = useState<{
    delivered?: boolean
    deliveryError?: string
  } | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setErrorMessage(null)

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      if (!res.ok) {
        let err = "提交失败，请稍后重试"
        try {
          const data = await res.json()
          if (typeof data?.error === "string") err = data.error
        } catch {
          // ignore
        }
        setErrorMessage(err)
        return
      }

      let data: any = null
      try {
        data = await res.json()
      } catch {
        // ignore
      }

      setSubmissionInfo(data)
      setIsSubmitted(true)

      // Reset form after showing success message
      setTimeout(() => {
        setIsSubmitted(false)
        setSubmissionInfo(null)
        setFormData({
          name: "",
          phone: "",
          targetCity: "",
          industry: "",
          hasStore: "",
          storeProblem: "",
          preferGrafting: "",
          consent: false,
        })
      }, 3000)
    } catch {
      setErrorMessage("网络错误，提交失败，请稍后重试")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="contact" className="py-20 md:py-28">
      <div ref={ref} className="container mx-auto px-4">
        {/* Section Title */}
        <div
          className={`text-center mb-12 transition-all duration-1000 ${
            isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4">
            联系招商
          </h2>
          <div className="w-16 h-1 bg-primary mx-auto rounded-full mb-4" />
          <p className="text-foreground/70 max-w-2xl mx-auto">
            请直接拨打下方热线联系
          </p>
          <p className="text-foreground/70 max-w-2xl mx-auto mt-2">
            留下您的联系方式，招商经理将在24小时内与您取得联系
          </p>
        </div>

        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8 lg:gap-12">
          {/* Contact Info */}
          <div
            className={`transition-all duration-1000 ${
              isInView ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"
            }`}
          >
            <div className="bg-card border border-border rounded-xl p-6 md:p-8 h-full">
              <h3 className="font-serif text-2xl font-bold text-foreground mb-6">
                联系方式
              </h3>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Phone className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium text-foreground mb-1">加盟热线（微信同号）</h4>
                    <p className="text-2xl font-serif font-bold text-primary">
                      187-6818-9822
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Clock className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium text-foreground mb-1">服务时间</h4>
                    <p className="text-foreground/70">周一至周日 9:00-21:00</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-primary" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M8.691 2.188C3.891 2.188 0 5.476 0 9.53c0 2.212 1.17 4.203 3.002 5.55a.59.59 0 0 1 .213.665l-.39 1.48c-.019.07-.048.141-.048.213 0 .163.13.295.29.295a.326.326 0 0 0 .167-.054l1.903-1.114a.864.864 0 0 1 .717-.098 10.16 10.16 0 0 0 2.837.403c.276 0 .543-.027.811-.05-.857-2.578.157-4.972 1.932-6.446 1.703-1.415 3.882-1.98 5.853-1.838-.576-3.583-4.196-6.348-8.596-6.348zM5.785 5.991c.642 0 1.162.529 1.162 1.18a1.17 1.17 0 0 1-1.162 1.178A1.17 1.17 0 0 1 4.623 7.17c0-.651.52-1.18 1.162-1.18zm5.813 0c.642 0 1.162.529 1.162 1.18a1.17 1.17 0 0 1-1.162 1.178 1.17 1.17 0 0 1-1.162-1.178c0-.651.52-1.18 1.162-1.18zm5.34 2.867c-1.797-.052-3.746.512-5.28 1.786-1.72 1.428-2.687 3.72-1.78 6.22.942 2.453 3.666 4.229 6.884 4.229.826 0 1.622-.12 2.361-.336a.722.722 0 0 1 .598.082l1.584.926a.272.272 0 0 0 .14.047c.134 0 .24-.111.24-.247 0-.06-.023-.12-.038-.177l-.327-1.233a.582.582 0 0 1-.023-.156.49.49 0 0 1 .201-.398C23.024 18.48 24 16.82 24 14.98c0-3.21-2.931-5.837-6.656-6.088V8.89c-.135-.004-.272-.02-.407-.032zm-2.53 3.274c.535 0 .969.44.969.982a.976.976 0 0 1-.969.983.976.976 0 0 1-.969-.983c0-.542.434-.982.97-.982zm4.844 0c.535 0 .969.44.969.982a.976.976 0 0 1-.969.983.976.976 0 0 1-.969-.983c0-.542.434-.982.969-.982z"/>
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-medium text-foreground mb-1">官方公众号</h4>
                    <p className="text-foreground/70">
                      <OfficialAccountLink className="text-primary underline-offset-2 hover:underline" />
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-border">
                <p className="text-foreground/60 text-sm">
                  * 我们承诺对您的信息严格保密
                </p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div
            className={`transition-all duration-1000 ${
              isInView ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"
            }`}
          >
            <div className="bg-card border border-border rounded-xl p-6 md:p-8">
              <h3 className="font-serif text-2xl font-bold text-foreground mb-6">
                填写信息
              </h3>

              {isSubmitted ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <svg
                      className="w-8 h-8 text-primary"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <h4 className="font-serif text-xl font-bold text-foreground mb-2">
                    提交成功
                  </h4>
                  <p className="text-foreground/70">
                    感谢您的咨询，我们将在24小时内联系您
                  </p>
                  {submissionInfo && submissionInfo.delivered === false ? (
                    <p className="text-foreground/60 text-sm mt-4">
                      已收到提交内容，但当前未成功转发到后台接口，请稍后再试或检查服务端配置。
                    </p>
                  ) : null}
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  {errorMessage ? (
                    <div
                      className="rounded-lg border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive"
                      role="alert"
                    >
                      {errorMessage}
                    </div>
                  ) : null}
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      您的姓名 <span className="text-secondary">*</span>
                    </label>
                    <Input
                      type="text"
                      required
                      placeholder="请输入您的姓名"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      className="bg-background border-border focus:border-primary"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      联系电话 <span className="text-secondary">*</span>
                    </label>
                    <Input
                      type="tel"
                      required
                      placeholder="请输入您的手机号码"
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({ ...formData, phone: e.target.value })
                      }
                      className="bg-background border-border focus:border-primary"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      你准备在哪个具体城市开店？ <span className="text-secondary">*</span>
                    </label>
                    <Input
                      type="text"
                      required
                      placeholder="请输入您计划开店的城市"
                      value={formData.targetCity}
                      onChange={(e) =>
                        setFormData({ ...formData, targetCity: e.target.value })
                      }
                      className="bg-background border-border focus:border-primary"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      你目前属于什么行业？ <span className="text-secondary">*</span>
                    </label>
                    <Input
                      type="text"
                      required
                      placeholder="请输入您目前从事的行业"
                      value={formData.industry}
                      onChange={(e) =>
                        setFormData({ ...formData, industry: e.target.value })
                      }
                      className="bg-background border-border focus:border-primary"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      你目前是否有门店？ <span className="text-secondary">*</span>
                    </label>
                    <div className="flex gap-4">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="hasStore"
                          value="是"
                          required
                          checked={formData.hasStore === "是"}
                          onChange={(e) =>
                            setFormData({ ...formData, hasStore: e.target.value, storeProblem: "", preferGrafting: "" })
                          }
                          className="w-4 h-4 text-primary border-border focus:ring-primary"
                        />
                        <span className="text-foreground">是</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="hasStore"
                          value="否"
                          required
                          checked={formData.hasStore === "否"}
                          onChange={(e) =>
                            setFormData({ ...formData, hasStore: e.target.value, storeProblem: "", preferGrafting: "" })
                          }
                          className="w-4 h-4 text-primary border-border focus:ring-primary"
                        />
                        <span className="text-foreground">否</span>
                      </label>
                    </div>
                  </div>

                  {formData.hasStore === "是" && (
                    <>
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">
                          目前门店遇到的最大问题是：
                        </label>
                        <Input
                          type="text"
                          placeholder="请描述您门店目前遇到的主要问题"
                          value={formData.storeProblem}
                          onChange={(e) =>
                            setFormData({ ...formData, storeProblem: e.target.value })
                          }
                          className="bg-background border-border focus:border-primary"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">
                          是否更倾向于嫁接方案？
                        </label>
                        <div className="flex gap-4">
                          <label className="flex items-center gap-2 cursor-pointer">
                            <input
                              type="radio"
                              name="preferGrafting"
                              value="是"
                              checked={formData.preferGrafting === "是"}
                              onChange={(e) =>
                                setFormData({ ...formData, preferGrafting: e.target.value })
                              }
                              className="w-4 h-4 text-primary border-border focus:ring-primary"
                            />
                            <span className="text-foreground">是</span>
                          </label>
                          <label className="flex items-center gap-2 cursor-pointer">
                            <input
                              type="radio"
                              name="preferGrafting"
                              value="否"
                              checked={formData.preferGrafting === "否"}
                              onChange={(e) =>
                                setFormData({ ...formData, preferGrafting: e.target.value })
                              }
                              className="w-4 h-4 text-primary border-border focus:ring-primary"
                            />
                            <span className="text-foreground">否</span>
                          </label>
                        </div>
                      </div>
                    </>
                  )}

                  <label className="flex items-start gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      required
                      checked={formData.consent}
                      onChange={(e) =>
                        setFormData({ ...formData, consent: e.target.checked })
                      }
                      className="mt-1 w-4 h-4 text-primary border-border focus:ring-primary"
                    />
                    <span className="text-sm text-foreground/80 leading-6">
                      我已阅读并同意
                      <Link
                        href="/privacy"
                        target="_blank"
                        className="mx-1 text-primary underline underline-offset-2"
                      >
                        《隐私政策》
                      </Link>
                      ，同意提交我的联系方式用于招商咨询沟通。
                    </span>
                  </label>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-6 text-lg"
                  >
                    {isSubmitting ? "提交中..." : "立即咨询"}
                  </Button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
