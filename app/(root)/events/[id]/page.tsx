import Form from '@/components/ui/event-detail';
import Breadcrumbs from '@/components/ui/breadcrumbs';
import {
  fetchAllOpportunities,
  getOpportunity,
  addNewOpportunity,
} from "@/lib/actions/opportunity.actions";
import { notFound } from 'next/navigation';

export default async function Page({ params }: { params: { id: string } }) {
    const id = params.id;
    const [event] = await Promise.all([
      getOpportunity(id),
      ]);
      if (!event) {
        notFound();
      }
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'events', 
            href: '/events/' },
          {
            label: 'view event',
            href: `/events/${id}`,
            active: true,
          },
        ]}
      />
      <Form event={event}/>
      
    </main>
  );
}