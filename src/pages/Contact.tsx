
import { useEffect } from "react";
import Layout from "@/components/Layout";
import ContactHeader from "@/components/contact/ContactHeader";
import ContactInfo from "@/components/contact/ContactInfo";
import ContactForm from "@/components/contact/ContactForm";

const Contact = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Layout>
      <section className="pt-24 pb-16 min-h-screen flex items-center">
        <div className="container mx-auto px-4 max-w-6xl">
          <ContactHeader />
            <ContactInfo />
            {/* <ContactForm /> */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Contact;
