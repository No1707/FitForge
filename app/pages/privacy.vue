<script setup lang="ts">useHead({ title: 'Données et confidentialité · FitForge' })</script>
<template>
  <div class="ff-page max-w-3xl">
    <h1 class="ff-title">Données et confidentialité</h1>
    <div class="ff-panel ff-panel-pad mt-7 space-y-7 text-sm leading-relaxed">
      <section>
        <h2 class="font-semibold text-lg mb-2">Sauvegarde locale</h2>
        <p class="text-muted">Les programmes, brouillons et séances sont enregistrés dans ce navigateur. Effacer les données du site les supprime aussi. Sur un appareil partagé, les données créées sans compte sont accessibles aux autres utilisateurs du navigateur.</p>
      </section>
      <section>
        <h2 class="font-semibold text-lg mb-2">Sauvegarde dans un compte</h2>
        <p class="text-muted">Supabase gère les comptes et les programmes. Quand la synchronisation est disponible, les performances, notes et dates de séance sont aussi enregistrées dans ton compte. L’indicateur de sauvegarde signale les données en attente. Tu peux importer les programmes et séances terminées sans compte depuis Programmes ou Progression.</p>
      </section>
      <section>
        <h2 class="font-semibold text-lg mb-2">Explications par IA</h2>
        <p class="text-muted">Cette option est désactivée par défaut. Si tu l’actives, Google Gemini reçoit l’objectif et les exercices du programme pour en expliquer l’organisation. Ton nom, les zones exclues, tes performances et tes notes ne sont pas envoyés. La création du programme fonctionne sans IA. N’ajoute pas d’information médicale dans les champs libres.</p>
      </section>
      <section>
        <h2 class="font-semibold text-lg mb-2">Export et suppression</h2>
        <p class="text-muted">Depuis Progression, tu peux exporter tes séances en JSON ou les supprimer. Hors connexion, les suppressions attendent la prochaine synchronisation. Supprimer un programme conserve les séances déjà réalisées.</p>
        <UButton to="/progress" label="Ouvrir l’historique" trailing-icon="i-lucide-arrow-right" color="neutral" variant="outline" class="mt-4" />
      </section>
    </div>
  </div>
</template>
