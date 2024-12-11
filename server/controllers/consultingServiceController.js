import ConsultingService from '../models/consultingService.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import ApiError from '../utils/ApiError.js';
import ApiResponse from '../utils/ApiResponse.js';
export const feedConsultingData = asyncHandler(async (req, res) => {
  const consultingData = [
    {
      ServiceProvider: "McKinsey & Co.",
      Domain: "Management",
      ServiceOffered: "Business Strategy",
      PricingStructure: "Project-Based",
      EstimatedCost: "$100,000",
      Availability: "Global",
      ClientIndustryFocus: "Any",
      ExperienceExpertiseLevel: "30+ years",
      ContactInformation: "info@mckinsey.com",
      Website: "https://www.mckinsey.com",
    },
    {
      ServiceProvider: "Deloitte",
      Domain: "IT",
      ServiceOffered: "Cloud Migration",
      PricingStructure: "Hourly",
      EstimatedCost: "$150/hour",
      Availability: "Global",
      ClientIndustryFocus: "Retail, Manufacturing",
      ExperienceExpertiseLevel: "20+ years",
      ContactInformation: "contact@deloitte.com",
      Website: "https://www2.deloitte.com",
    },
    {
      ServiceProvider: "PwC",
      Domain: "Financial",
      ServiceOffered: "Tax Advisory",
      PricingStructure: "Retainer",
      EstimatedCost: "$10,000/month",
      Availability: "Global",
      ClientIndustryFocus: "Healthcare, Finance",
      ExperienceExpertiseLevel: "25+ years",
      ContactInformation: "support@pwc.com",
      Website: "https://www.pwc.com",
    },
    {
      ServiceProvider: "Accenture",
      Domain: "IT",
      ServiceOffered: "Digital Transformation",
      PricingStructure: "Project-Based",
      EstimatedCost: "$200,000",
      Availability: "Global",
      ClientIndustryFocus: "Technology, Retail",
      ExperienceExpertiseLevel: "20+ years",
      ContactInformation: "inquiries@accenture.com",
      Website: "https://www.accenture.com",
    },
    {
      ServiceProvider: "KPMG",
      Domain: "Legal",
      ServiceOffered: "Compliance Consulting",
      PricingStructure: "Retainer",
      EstimatedCost: "$15,000/month",
      Availability: "Global",
      ClientIndustryFocus: "Financial Services",
      ExperienceExpertiseLevel: "15+ years",
      ContactInformation: "support@kpmg.com",
      Website: "https://home.kpmg",
    },
    {
      ServiceProvider: "Bain & Company",
      Domain: "Management",
      ServiceOffered: "Mergers & Acquisitions",
      PricingStructure: "Project-Based",
      EstimatedCost: "$300,000",
      Availability: "Global",
      ClientIndustryFocus: "Healthcare, Manufacturing",
      ExperienceExpertiseLevel: "30+ years",
      ContactInformation: "info@bain.com",
      Website: "https://www.bain.com",
    },
    {
      ServiceProvider: "Ernst & Young (EY)",
      Domain: "Financial",
      ServiceOffered: "Auditing and Assurance",
      PricingStructure: "Fixed Annual Cost",
      EstimatedCost: "$50,000/year",
      Availability: "Global",
      ClientIndustryFocus: "Any",
      ExperienceExpertiseLevel: "25+ years",
      ContactInformation: "info@ey.com",
      Website: "https://www.ey.com",
    },
    {
      ServiceProvider: "BCG (Boston Consulting)",
      Domain: "Management",
      ServiceOffered: "Market Entry Strategy",
      PricingStructure: "Project-Based",
      EstimatedCost: "$120,000",
      Availability: "Global",
      ClientIndustryFocus: "Automotive, Technology",
      ExperienceExpertiseLevel: "30+ years",
      ContactInformation: "connect@bcg.com",
      Website: "https://www.bcg.com",
    },
    {
      ServiceProvider: "Capgemini",
      Domain: "IT",
      ServiceOffered: "Cybersecurity Services",
      PricingStructure: "Hourly",
      EstimatedCost: "$200/hour",
      Availability: "Global",
      ClientIndustryFocus: "Finance, Retail",
      ExperienceExpertiseLevel: "20+ years",
      ContactInformation: "security@capgemini.com",
      Website: "https://www.capgemini.com",
    },
    {
      ServiceProvider: "Local IT Consultant",
      Domain: "IT",
      ServiceOffered: "Network Security Audit",
      PricingStructure: "Hourly",
      EstimatedCost: "$75/hour",
      Availability: "Regional (US)",
      ClientIndustryFocus: "Small Businesses",
      ExperienceExpertiseLevel: "5+ years",
      ContactInformation: "consultant@localit.com",
      Website: "N/A",
    },
    {
      ServiceProvider: "Gartner",
      Domain: "Research & Advisory",
      ServiceOffered: "Strategic IT Planning",
      PricingStructure: "Subscription",
      EstimatedCost: "$30,000/year",
      Availability: "Global",
      ClientIndustryFocus: "IT, Business Strategy",
      ExperienceExpertiseLevel: "40+ years",
      ContactInformation: "contact@gartner.com",
      Website: "https://www.gartner.com",
    },
    {
      ServiceProvider: "Tata Consultancy Services",
      Domain: "IT",
      ServiceOffered: "Business Process Outsourcing (BPO)",
      PricingStructure: "Project-Based",
      EstimatedCost: "$150,000",
      Availability: "Global",
      ClientIndustryFocus: "Retail, Healthcare",
      ExperienceExpertiseLevel: "25+ years",
      ContactInformation: "support@tcs.com",
      Website: "https://www.tcs.com",
    },
    {
      ServiceProvider: "Roland Berger",
      Domain: "Management",
      ServiceOffered: "Innovation Consulting",
      PricingStructure: "Project-Based",
      EstimatedCost: "$100,000",
      Availability: "Global",
      ClientIndustryFocus: "Technology, Manufacturing",
      ExperienceExpertiseLevel: "20+ years",
      ContactInformation: "contact@rolandberger.com",
      Website: "https://www.rolandberger.com",
    },
    {
      ServiceProvider: "Infosys",
      Domain: "IT",
      ServiceOffered: "AI and Automation Solutions",
      PricingStructure: "Project-Based",
      EstimatedCost: "$250,000",
      Availability: "Global",
      ClientIndustryFocus: "Healthcare, Finance",
      ExperienceExpertiseLevel: "20+ years",
      ContactInformation: "ai.solutions@infosys.com",
      Website: "https://www.infosys.com",
    },
    {
      ServiceProvider: "Booz Allen Hamilton",
      Domain: "Government",
      ServiceOffered: "Defense Consulting",
      PricingStructure: "Retainer",
      EstimatedCost: "$500,000/year",
      Availability: "US",
      ClientIndustryFocus: "Government, Defense",
      ExperienceExpertiseLevel: "100+ years",
      ContactInformation: "defense@bah.com",
      Website: "https://www.boozallen.com",
    },
    {
      ServiceProvider: "ZS Associates",
      Domain: "Sales & Marketing",
      ServiceOffered: "Sales Strategy Consulting",
      PricingStructure: "Project-Based",
      EstimatedCost: "$80,000",
      Availability: "Global",
      ClientIndustryFocus: "Pharmaceuticals, Technology",
      ExperienceExpertiseLevel: "20+ years",
      ContactInformation: "sales@zs.com",
      Website: "https://www.zs.com",
    },
  ];
   try {
    await ConsultingService.deleteMany();
    const insertedData = await ConsultingService.insertMany(consultingData);
    return res
    .status(201)
    .json(new ApiResponse(201, 'Data fed successfully', insertedData));
} catch (error) {
    return res
    .status(500)
    .json(new ApiError(500, 'Error feeding data', error.message));
}
});
export const getConsultingServices = async (req, res) => {
    try {
        const services = await ConsultingService.find();
        return res
        .status(200)
        .json(new ApiResponse(200, 'Consulting services fetched successfully', services));
    } catch (error) {
        return res
        .status(500)
        .json(new ApiError(500, 'Error fetching consulting services', error.message));
    }
};
