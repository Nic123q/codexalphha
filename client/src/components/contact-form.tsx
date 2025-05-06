import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useMutation } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';
import { useToast } from '@/hooks/use-toast';
import { motion } from 'framer-motion';
import {
  Mail,
  Headset,
  Users,
  Send,
} from 'lucide-react';
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';

const contactFormSchema = z.object({
  name: z.string().min(2, { message: 'Nome deve ter pelo menos 2 caracteres' }),
  email: z.string().email({ message: 'Email inválido' }),
  subject: z.string().min(3, { message: 'Assunto deve ter pelo menos 3 caracteres' }),
  message: z.string().min(10, { message: 'Mensagem deve ter pelo menos 10 caracteres' }),
  newsletter: z.boolean().default(false),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

const ContactForm = () => {
  const { toast } = useToast();

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: '',
      email: '',
      subject: '',
      message: '',
      newsletter: false,
    },
  });

  const contactMutation = useMutation({
    mutationFn: (data: ContactFormValues) => apiRequest('POST', '/api/contact', data),
    onSuccess: () => {
      toast({
        title: 'Mensagem enviada!',
        description: 'Agradecemos pelo seu contato. Responderemos em breve.',
        variant: 'default',
      });
      form.reset();
    },
    onError: (error) => {
      toast({
        title: 'Erro ao enviar mensagem',
        description: error instanceof Error ? error.message : 'Tente novamente mais tarde',
        variant: 'destructive',
      });
    },
  });

  const onSubmit = (data: ContactFormValues) => {
    contactMutation.mutate(data);
  };

  return (
    <section id="contato" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center">
          <motion.div 
            className="lg:w-1/2 mb-12 lg:mb-0"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="text-white">Entre em </span>
              <span className="text-secondary">Contato</span>
            </h2>
            <div className="w-24 h-1 bg-primary mb-8"></div>
            <p className="text-xl text-gray-300 mb-8 max-w-lg">
              Tem alguma dúvida, sugestão ou feedback sobre o Codexium? Sua opinião é muito importante para nós.
            </p>

            <div className="space-y-6">
              <div className="flex items-start">
                <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                  <Mail className="text-secondary" size={20} />
                </div>
                <div className="ml-4">
                  <h3 className="text-xl font-bold text-white mb-1">Email</h3>
                  <p className="text-gray-300">contato@codexium.com.br</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                  <Headset className="text-secondary" size={20} />
                </div>
                <div className="ml-4">
                  <h3 className="text-xl font-bold text-white mb-1">Suporte</h3>
                  <p className="text-gray-300">suporte@codexium.com.br</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                  <Users className="text-secondary" size={20} />
                </div>
                <div className="ml-4">
                  <h3 className="text-xl font-bold text-white mb-1">Redes Sociais</h3>
                  <div className="flex space-x-4 mt-2">
                    <a href="#" className="text-gray-400 hover:text-white transition-colors text-xl">
                      <i className="fab fa-discord"></i>
                    </a>
                    <a href="#" className="text-gray-400 hover:text-white transition-colors text-xl">
                      <i className="fab fa-twitter"></i>
                    </a>
                    <a href="#" className="text-gray-400 hover:text-white transition-colors text-xl">
                      <i className="fab fa-instagram"></i>
                    </a>
                    <a href="#" className="text-gray-400 hover:text-white transition-colors text-xl">
                      <i className="fab fa-youtube"></i>
                    </a>
                    <a href="#" className="text-gray-400 hover:text-white transition-colors text-xl">
                      <i className="fab fa-twitch"></i>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div 
            className="lg:w-1/2 lg:pl-12"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="bg-card rounded-xl shadow-xl p-6 md:p-8">
              <h3 className="text-2xl font-bold text-white mb-6">Envie uma mensagem</h3>
              
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gray-300">Nome</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Seu nome"
                              className="bg-muted border border-muted rounded-lg p-3 text-white placeholder-gray-500 focus:outline-none focus:border-secondary"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gray-300">Email</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Seu email"
                              className="bg-muted border border-muted rounded-lg p-3 text-white placeholder-gray-500 focus:outline-none focus:border-secondary"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="subject"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-300">Assunto</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Assunto da mensagem"
                            className="bg-muted border border-muted rounded-lg p-3 text-white placeholder-gray-500 focus:outline-none focus:border-secondary"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-300">Mensagem</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Sua mensagem..."
                            rows={5}
                            className="bg-muted border border-muted rounded-lg p-3 text-white placeholder-gray-500 focus:outline-none focus:border-secondary"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="newsletter"
                    render={({ field }) => (
                      <FormItem className="flex items-center space-x-2">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            className="rounded text-primary focus:ring-primary"
                          />
                        </FormControl>
                        <FormLabel className="text-gray-300 text-sm cursor-pointer">
                          Desejo receber novidades e promoções por email
                        </FormLabel>
                      </FormItem>
                    )}
                  />

                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-primary to-secondary text-white font-bold py-3 px-6 rounded-lg transform transition-all hover:scale-[1.02] hover:shadow-lg"
                    disabled={contactMutation.isPending}
                  >
                    {contactMutation.isPending ? (
                      <span className="flex items-center">
                        <i className="fas fa-spinner fa-spin mr-2"></i>
                        Enviando...
                      </span>
                    ) : (
                      <span className="flex items-center justify-center">
                        <Send className="mr-2" size={18} />
                        Enviar Mensagem
                      </span>
                    )}
                  </Button>
                </form>
              </Form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
